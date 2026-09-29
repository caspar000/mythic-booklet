import { getCollection, type CollectionEntry } from 'astro:content';

type Linked = 'knights' | 'npcs' | 'myths' | 'holdings';

export const url = (path: string) => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;

export const sessionLabel = (s: CollectionEntry<'sessions'>) =>
  s.data.title ? `Session ${s.data.number} · ${s.data.title}` : `Session ${s.data.number}`;

export async function getSessions() {
  const sessions = await getCollection('sessions');
  return sessions.sort((a, b) => a.data.number - b.data.number);
}

export async function sessionsMentioning(collection: Linked, id: string) {
  return (await getSessions()).filter((s) => s.data[collection].some((ref) => ref.id === id));
}

export const byName = <T extends { data: { name: string } }>(a: T, b: T) => a.data.name.localeCompare(b.data.name);
