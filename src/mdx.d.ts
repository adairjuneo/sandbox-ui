/// <reference types="vite/client" />

declare module '*.mdx' {
  import { MDXComponents } from '@mdx-js/react';
  import { ComponentType } from 'react';

  const content: ComponentType<{ components?: MDXComponents }>;
  export default content;
}
