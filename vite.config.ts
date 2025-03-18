import mdx from '@mdx-js/rollup';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';
import rehypeStarryNight from 'rehype-starry-night';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig(async () => {
  return {
    plugins: [
      react(),
      mdx({
        rehypePlugins: [rehypeStarryNight],
      }),
      vanillaExtractPlugin({
        identifiers: ({ hash }) => String('sandbox-ui_').concat(hash),
      }),
    ],
    build: {
      sourcemap: true,
    },
    resolve: {
      alias: {
        '@': path.resolve(path.dirname(''), './src'),
      },
    },
  };
});
