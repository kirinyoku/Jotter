'use client';

import { z } from 'zod';
import { cn } from '@/lib/utils';
import { Note } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { Icons } from '@/components/icons';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, buttonVariants } from '@/components/ui/button';
import { notePatchSchema } from '@/lib/validations/note';
import { FC, useCallback, useEffect, useRef, useState } from 'react';

import Link from 'next/link';
import EditorJS from '@editorjs/editorjs';
import TextareaAutosize from 'react-textarea-autosize';
import useMutationDeleteNote from '@/hooks/useMutationDeleteNote';

import '@/styles/editor.css';

type FormData = z.infer<typeof notePatchSchema>;

interface EditorProps {
  note: Pick<Note, 'id' | 'title' | 'content' | 'isPrivate'>;
}

const Editor: FC<EditorProps> = ({ note }) => {
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(notePatchSchema),
  });

  const router = useRouter();
  const ref = useRef<EditorJS>();

  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isPrivate, setIsPrivate] = useState<boolean>(note.isPrivate);

  const { mutate: deleteNoteById } = useMutationDeleteNote();

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
    const Embed = (await import('@editorjs/embed'!)).default;
    const Table = (await import('@editorjs/table'!)).default;
    const List = (await import('@editorjs/list'!)).default;
    const Code = (await import('@editorjs/code'!)).default;
    const LinkTool = (await import('@editorjs/link'!)).default;
    const InlineCode = (await import('@editorjs/inline-code'!)).default;

    const body = notePatchSchema.parse(note);

    if (!ref.current) {
      const editor = new EditorJS({
        holder: 'editor',
        onReady() {
          ref.current = editor;
        },
        placeholder: 'Type here to write your note...',
        inlineToolbar: true,
        data: body.content,
        tools: {
          header: Header,
          linkTool: LinkTool,
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
        },
      });
    }
  }, [note]);

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
      <div className="grid w-full gap-10">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-10">
            <Link href="/" className={cn(buttonVariants({ variant: 'ghost' }))}>
              <>
                <Icons.chevronLeft className="mr-2 h-4 w-4" />
                Back
              </>
            </Link>
            <Button
              onClick={() => setIsPrivate((prev) => !prev)}
              type="button"
              variant="ghost"
              className="text-sm text-muted-foreground">
              {isPrivate ? (
                <span className="flex items-center justify-between gap-1">
                  {'Private'}
                  <Icons.lock className="h-4 w-4" />
                </span>
              ) : (
                <span className="flex items-center justify-between gap-1">
                  {'Public'}
                  <Icons.unlock className="h-4 w-4" />
                </span>
              )}
            </Button>
          </div>
          <div className="flex gap-2">
            <button type="submit" className={cn(buttonVariants())}>
              {isSaving && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
              <span>Save</span>
            </button>
            <button
              type="button"
              onClick={() => deleteNote(note.id)}
              className={cn(buttonVariants({ variant: 'destructive' }))}>
              {isDeleting && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
              <span>Delete</span>
            </button>
          </div>
        </div>
        <div className="prose prose-stone mx-auto w-[800px] dark:prose-invert">
          <TextareaAutosize
            autoFocus
            id="title"
            defaultValue={note.title}
            placeholder="Note title"
            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
            {...register('title')}
          />
          <div id="editor" className="min-h-[500px]" />
          <p className="text-sm text-gray-500">
            Use <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">Tab</kbd> to open
            the command menu.
          </p>
        </div>
      </div>
    </form>
  );
};

export default Editor;
