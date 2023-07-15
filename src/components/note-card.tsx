import { FC } from 'react';
import { Icons } from './icons';
import { Note } from '@prisma/client';
import { Card, CardFooter, CardHeader, CardTitle } from './ui/card';
import Link from 'next/link';

interface NoteCardProps {
  note: Note;
}

const NoteCard: FC<NoteCardProps> = ({ note }) => {
  const date = new Date(note.createdAt).toLocaleString();

  return (
    <Card className="bg-secondary rounded-none cursor-pointer hover:bg-primary-foreground transition-colors">
      <Link href={`/editor/${note.id}`} className="flex items-center justify-between">
        <div>
          <CardHeader className="pt-3 pb-1">
            <CardTitle>{note.title}</CardTitle>
          </CardHeader>
          <CardFooter className="pb-2 pt-1">
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
