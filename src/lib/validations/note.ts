import * as z from 'zod';

export const notePatchSchema = z.object({
  title: z.string().min(3).max(128).optional(),
  isPrivate: z.boolean().default(false),
  // TODO: Type this properly from editorjs block types?
  content: z.any().optional(),
});
