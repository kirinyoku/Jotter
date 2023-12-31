'use client';

import { z } from 'zod';
import { cn } from '@/lib/utils';
import { Note } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { Icons } from '@/components/icons';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { toast } from '@/hooks/useToast';
import { zodResolver } from '@hookform/resolvers/zod';
import { notePatchSchema } from '@/lib/validations/note';
import { Button, buttonVariants } from '@/components/ui/button';
import { FC, useCallback, useEffect, useRef, useState } from 'react';

import Link from 'next/link';
import EditorJS from '@editorjs/editorjs';
import TextareaAutosize from 'react-textarea-autosize';
import useMutationDeleteNote from '@/hooks/useMutationDeleteNote';

import '@/styles/editor.css';
import { uploadFiles } from '@/lib/uploadthing';

type FormData = z.infer<typeof notePatchSchema>;

interface EditorProps {
  note: Pick<Note, 'id' | 'title' | 'content' | 'isPrivate' | 'authorId'>;
}

const Editor: FC<EditorProps> = ({ note }) => {
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(notePatchSchema),
  });

  const router = useRouter();
  const session = useSession();
  const ref = useRef<EditorJS>();

  // If the user of the session is the author of the note, then the edit mode is available.
  const isReadOnly = session.data?.user.id === note.authorId ? false : true;

  // const isReadOnly = true;

  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isPrivate, setIsPrivate] = useState<boolean>(note.isPrivate);

  const { mutate: deleteNoteById } = useMutationDeleteNote();

  const copyUrl = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(`http://localhost:3000/${note.id}`);

    toast({
      title: 'Copied',
      description: 'The link to the note was copied.',
      variant: 'default',
    });

    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  const deleteNote = (noteId: string) => {
    setIsDeleting(true);
    deleteNoteById(noteId, {
      onSuccess: () => {
        router.replace('/');
        toast({
          title: 'Note deleted.',
          description: 'Your note has been successfully deleted.',
          variant: 'default',
        });
      },
      onError: () =>
        toast({
          title: 'Something went wrong.',
          description: 'Your note was not deleted. Please try again.',
          variant: 'destructive',
        }),
      onSettled: () => setIsDeleting(false),
    });
  };

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import('@editorjs/editorjs')).default;
    const Header = (await import('@editorjs/header')).default;
    const Embed = (await import('@editorjs/embed')).default;
    const Table = (await import('@editorjs/table')).default;
    const List = (await import('@editorjs/list')).default;
    const Code = (await import('@editorjs/code')).default;
    const LinkTool = (await import('@editorjs/link')).default;
    const InlineCode = (await import('@editorjs/inline-code')).default;
    const ImageTool = (await import('@editorjs/image')).default;

    const body = notePatchSchema.parse(note);

    if (!ref.current) {
      const editor = new EditorJS({
        holder: 'editor',
        onReady() {
          ref.current = editor;
        },
        readOnly: isReadOnly,
        placeholder: 'Type here to write your note...',
        inlineToolbar: true,
        data: body.content,
        tools: {
          header: Header,
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: '/api/link',
            },
          },
          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  const [res] = await uploadFiles({
                    files: [file],
                    endpoint: 'imageUploader',
                  });

                  return {
                    success: 1,
                    file: {
                      url: res.fileUrl,
                    },
                  };
                },
              },
            },
          },
        },
      });
    }
  }, [note, isReadOnly]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      initializeEditor();

      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);

  async function onSubmit(data: FormData) {
    setIsSaving(true);

    const blocks = await ref.current?.save();

    const response = await fetch(`/api/notes/${note.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: data.title,
        content: blocks,
        isPrivate,
      }),
    });

    setIsSaving(false);

    if (!response?.ok) {
      return toast({
        title: 'Something went wrong.',
        description: 'Your post was not saved. Please try again.',
        variant: 'destructive',
      });
    }

    router.refresh();

    return toast({
      description: 'Your post has been saved.',
    });
  }

  if (!isMounted) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))}>
              <>
                <Icons.chevronLeft className="mr-2 h-4 w-4" />
                Back
              </>
            </Link>
            <Button
              onClick={() => !isReadOnly && setIsPrivate((prev) => !prev)}
              type="button"
              size="sm"
              variant="ghost"
              className="text-sm text-muted-foreground">
              {isPrivate ? (
                <span className="flex items-center justify-between gap-1">
                  <span className="hidden sm:inline">Private</span>
                  <Icons.lock className="h-4 w-4" />
                </span>
              ) : (
                <span className="flex items-center justify-between gap-1">
                  <span className="hidden sm:inline">Public</span>
                  <Icons.unlock className="h-4 w-4" />
                </span>
              )}
            </Button>
            {!isPrivate && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-sm text-muted-foreground"
                onClick={copyUrl}>
                <span className="flex items-center justify-between gap-1">
                  {isCopied ? (
                    <>
                      <span className="hidden sm:inline">Copied</span>
                      <Icons.copyCheck className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      <span className="hidden sm:inline">Copy Link</span>
                      <Icons.copy className="w-4 h-4" />
                    </>
                  )}
                </span>
              </Button>
            )}
          </div>
          {!isReadOnly && (
            <div className="flex gap-2">
              <button type="submit" className={cn(buttonVariants({ size: 'sm' }))}>
                {isSaving && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                <span>Save</span>
              </button>
              <button
                type="button"
                onClick={() => deleteNote(note.id)}
                className={cn(buttonVariants({ variant: 'destructive', size: 'sm' }))}>
                {isDeleting && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>
        <div className="prose prose-stone mx-auto dark:prose-invert">
          <TextareaAutosize
            autoFocus
            id="title"
            readOnly={isReadOnly}
            defaultValue={note.title}
            placeholder="Note title"
            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
            {...register('title')}
          />
          <div id="editor" className="min-h-[500px]" />
          {!isReadOnly && (
            <p className="text-sm text-gray-500">
              Use <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">Tab</kbd> to
              open the command menu.
            </p>
          )}
        </div>
      </div>
    </form>
  );
};

export default Editor;
