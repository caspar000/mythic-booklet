import { defineMdastPlugin } from 'satteri';

// The CMS stores entry-relative images as bare file names ("photo.webp").
// Astro resolves markdown images like imports, so they need a "./" prefix.
export const relativeImages = defineMdastPlugin({
  name: 'relative-images',
  image(node, ctx) {
    if (node.url && !/^(\.{1,2}\/|\/|[a-z][a-z0-9+.-]*:)/i.test(node.url)) ctx.setProperty(node, 'url', `./${node.url}`);
  },
});
