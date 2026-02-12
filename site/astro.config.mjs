// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { remarkAlert } from 'remark-github-blockquote-alert';
import rehypeMermaid from 'rehype-mermaid';
import rehypeGlossaireTooltip from './src/plugins/rehype-glossaire-tooltip.ts';

export default defineConfig({
  site: 'https://cryptosous.com',
  markdown: {
    syntaxHighlight: {
      type: 'shiki',
      excludeLangs: ['mermaid'],
    },
    remarkPlugins: [remarkAlert],
    rehypePlugins: [
      [rehypeMermaid, {
        strategy: 'inline-svg',
        dark: true,
        mermaidConfig: {
          theme: 'dark',
          themeVariables: {
            primaryColor: '#141D30',
            primaryTextColor: '#F1F5F9',
            primaryBorderColor: '#F59E0B',
            lineColor: '#8B5CF6',
            secondaryColor: '#1A2540',
            tertiaryColor: '#0E1525',
            noteBkgColor: '#141D30',
            noteTextColor: '#94A3B8',
            noteBorderColor: '#1E2A45',
          },
        },
      }],
      rehypeGlossaireTooltip,
    ],
  },
  integrations: [
    react(),
    mdx(),
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
