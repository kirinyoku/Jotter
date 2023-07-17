import { FC } from 'react';
import { Icons } from './icons';
import { ClientNote } from '@/types/note';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import Link from 'next/link';

interface NoteCardProps {
  note: ClientNote;
}

const NoteCard: FC<NoteCardProps> = ({ note }) => {
  const date = new Date(note.createdAt).toLocaleString();
  const firstLineOfNote = note.content.blocks[0]?.data?.text ?? 'No additional text';

  return (
    <Card className="rounded-lg cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
      <Link href={`/${note.id}`} className="flex items-center justify-between">
        <div>
          <CardHeader className="pt-3 pb-0">
            <CardTitle className="text-2xl">{note.title}</CardTitle>
          </CardHeader>
          <CardContent className="text-xl py-0">{firstLineOfNote}</CardContent>
          <CardFooter className="pb-3 pt-1">
            <p className="text-sm">{date}</p>
          </CardFooter>
        </div>
        <div className="px-4">
          {note.isPrivate ? (
            <span className="flex items-center gap-2 font-light">
              <span className="hidden sm:inline">Private</span>
              <Icons.lock className="w-4 h-4" />
            </span>
          ) : (
            <span className="flex items-center gap-2 font-light">
              <span className="hidden sm:inline">Public</span>
              <Icons.unlock className="w-4 h-4" />
            </span>
          )}
        </div>
      </Link>
    </Card>
  );
};
export default NoteCard;
