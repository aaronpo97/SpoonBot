import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import fs from 'fs/promises';
import path from 'path';
import markdownToHTML from '../util/markdownToHTML';

// eslint-disable-next-line react/prop-types
const About: NextPage<{ aboutContent: string }> = ({ aboutContent }) => {
  return (
    <>
      <Head>
        <title>SpoonBot: About</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main className="flex flex-col bg-base-300 items-center md:h-full pb-12 justify-center">
        <section className="w-8/12 text-base-content">
          <div
            className="prose max-w-none leading-tight prose-h1:text-6xl mt-8 prose-h1:mb-3 prose-h2:mt-0 prose-h2:mb-2 prose-a:no-underline"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: aboutContent }}
          />
        </section>
      </main>
    </>
  );
};

export const getStaticProps = async () => {
  // read markdown file
  const markdown = await fs.readFile(path.join('content-pages', 'about.md'), 'utf-8');
  const aboutContent = await markdownToHTML(markdown);

  return {
    props: { aboutContent },
  };
};
export default About;
