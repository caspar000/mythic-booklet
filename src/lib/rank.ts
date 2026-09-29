// Glory needed for each rank. Adjust if your copy of the book differs.
const RANKS = [
  { glory: 12, name: 'Knight-Radiant' },
  { glory: 9, name: 'Knight-Dominant' },
  { glory: 6, name: 'Knight-Tenant' },
  { glory: 3, name: 'Knight-Gallant' },
  { glory: 0, name: 'Knight-Errant' },
];

export const rankFor = (glory: number) => RANKS.find((r) => glory >= r.glory)!.name;
