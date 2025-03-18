import { MDXProvider } from '@mdx-js/react';

import Page from './page.mdx';

const components = {
  em: (props: any) => <i {...props} />,
};

const FormPage = () => {
  return (
    <MDXProvider components={components}>
      <Page />
    </MDXProvider>
  );
};

export default FormPage;
