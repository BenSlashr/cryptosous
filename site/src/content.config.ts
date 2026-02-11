import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const glossaire = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/glossaire' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    shortDefinition: z.string(),
    category: z.enum(['blockchain', 'defi', 'trading', 'sécurité', 'mining', 'web3', 'réglementation']),
    relatedTerms: z.array(z.string()).default([]),
    relatedCryptos: z.array(z.string()).default([]),
    difficulty: z.enum(['débutant', 'intermédiaire', 'avancé']).default('débutant'),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    category: z.string(),
    author: z.string(),
    readingTime: z.string().optional(),
    image: z.string().optional(),
  }),
});

export const collections = { glossaire, blog };
