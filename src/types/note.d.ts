import { Note } from '@prisma/client';

export interface Block {
  id: string;
  data?: Data | undefined;
  type: string;
}

export interface Data {
  text?: string | undefined;
}

export type ClientNote = Omit<Note, 'content'> & {
  content: {
    time: number;
    blocks: Block[];
    version: string;
  };
};
