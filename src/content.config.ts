import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const md = (name: string) => glob({ pattern: '*.md', base: `./src/content/${name}` });

const sessions = defineCollection({
  loader: md('sessions'),
  schema: ({ image }) =>
    z.object({
      number: z.number().int().positive(),
      title: z.string().optional(),
      date: z.coerce.date().optional(),
      cover: image().optional(),
      knights: z.array(reference('knights')).default([]),
      npcs: z.array(reference('npcs')).default([]),
      myths: z.array(reference('myths')).default([]),
      holdings: z.array(reference('holdings')).default([]),
    }),
});

const statValue = z.number().int().nonnegative().nullish();

const knights = defineCollection({
  loader: md('knights'),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      player: z.string().optional(),
      portrait: image().optional(),
      status: z.enum(['Questing', 'Dead', 'Retired', 'Missing', 'Other']).default('Questing'),
      fate: z.string().optional(),
      glory: z.number().int().min(0).default(0),
      ages: z
        .array(z.object({ label: z.string(), vig: statValue, cla: statValue, spi: statValue, gd: statValue }))
        .default([]),
      couplet: z.string().optional(),
      ability: z.object({ name: z.string().optional(), text: z.string().optional() }).optional(),
      passion: z.object({ name: z.string().optional(), text: z.string().optional() }).optional(),
      seer: reference('npcs').nullish(),
    }),
});

const npcs = defineCollection({
  loader: md('npcs'),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      image: image().optional(),
      description: z.string().optional(),
      status: z.enum(['Alive', 'Dead', 'Unknown']).default('Unknown'),
      holding: reference('holdings').nullish(),
    }),
});

const myths = defineCollection({
  loader: md('myths'),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      image: image().optional(),
      description: z.string().optional(),
      status: z.enum(['Active', 'Resolved', 'Dormant']).default('Active'),
      omens: z.array(z.object({ text: z.string(), session: reference('sessions').nullish() })).default([]),
    }),
});

const holdings = defineCollection({
  loader: md('holdings'),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      image: image().optional(),
      description: z.string().optional(),
      ruler: reference('npcs').nullish(),
    }),
});

const campaign = defineCollection({
  loader: md('campaign'),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      map: image().optional(),
    }),
});

export const collections = { sessions, knights, npcs, myths, holdings, campaign };
