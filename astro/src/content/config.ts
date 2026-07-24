import { defineCollection, z } from 'astro:content';

const portfolio = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    link: z.string().url(),
    image: z.string(),
    tags: z.array(z.string()),
    description: z.string().optional(),
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    postNumber: z.number(),
    title: z.string(),
    date: z.coerce.date(),
    author: z.string(),
    image: z.string(),
    tags: z.array(z.string()),
    description: z.string(),
  }),
});

const career = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    company: z.string(),
    // location: z.string(),
    // period: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    tasks: z.array(z.string()),
    tags: z.array(z.string()),
  }),
});

export const collections = {
  portfolio,
  blog,
  career,
};
