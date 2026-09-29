import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineMdastPlugin } from 'satteri';

// The CMS writes uploaded images as root paths ("/src/assets/uploads/x.webp").
// Astro only optimizes markdown images with relative paths, so rewrite them
// relative to the file being rendered.
export const relativeImages = ({ fileURL }) =>
  defineMdastPlugin({
    name: 'relative-images',
    image(node, ctx) {
      if (!fileURL || !node.url?.startsWith('/src/')) return;
      const dir = path.dirname(fileURLToPath(fileURL));
      ctx.setProperty(node, 'url', path.relative(dir, path.join(process.cwd(), node.url)));
    },
  });
