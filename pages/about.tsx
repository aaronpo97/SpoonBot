import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import sanitizeHtml from 'sanitize-html';

import fs from 'fs/promises';
import path from 'path';
import markdownToHTML from '../util/markdownToHTML';

// eslint-disable-next-line react/prop-types
const About: NextPage<{ aboutContent: string }> = ({ aboutContent }) => {
  return (
    <>
      <Head>
        <title>SpoonBot: About</title>
        <meta
          name="description"
          content="SpoonBot is a web application that uses OpenAI's GPT-3 API to generate restaurant names, reviews, and menus."
        />
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
  const markdown = await fs.readFile(path.join('content-pages', 'about.md'), 'utf-8');
  const html = await markdownToHTML(markdown);
  const aboutContent = sanitizeHtml(html);

  return {
    props: { aboutContent },
  };
};
export default About;
