import { defineCollection, z } from 'astro:content';

const patterns = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['creational', 'structural', 'behavioral']),
    order: z.number(),
  }),
});

export const collections = { patterns };
