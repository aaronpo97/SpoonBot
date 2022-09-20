import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>SpoonBot: About</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main className="flex flex-col bg-base-300 items-center lg:h-full pb-12">
        <section className="w-9/12 lg:mt-32 mt-10 text-base-content">
          <h1 className="font-bold text-5xl">About</h1>
          <article className="mt-6">
            <h2 className="font-bold text-xl">What is SpoonBot?</h2>
            <p className="mt-3">
              SpoonBot is a web application that uses OpenAI&apos;s GPT-3 API to generate
              restaurant names and reviews. It was created by Aaron William Po. If you
              would like to learn more about the project, you can visit the GitHub
              repository{' '}
              <Link href="https://github.com/aaronpo97/SpoonBot">
                <span className="hover:underline cursor-pointer">here</span>
              </Link>
              .
            </p>
          </article>
          <article className="mt-3">
            <h2 className="font-bold text-xl">What is GPT-3?</h2>
            <p className="mt-3">
              Generative Pre-trained Transformer 3 (GPT-3) is a natural language
              processing model that uses a deep learning technique to generate human-like
              text. It was developed by OpenAI, a research lab focused on artificial
              intelligence and machine learning.
            </p>
            <p className="mt-3">
              GPT-3 is trained on a large corpus of text, such as books, articles, and
              conversation transcripts. The training data is used to teach the model how
              to write in a human-like manner. The model creates text by predicting the
              next word in a sequence, given the previous words, generating text that is
              indistinguishable from human-written text.
            </p>
            <h3 className="text-lg mt-3 font-semibold">Bias Disclaimer</h3>
            <p className="mt-3">
              GPT-3 is a powerful tool, but it is not perfect. As it is trained on a large
              corpus of text, it can sometimes pick up on biases in the training data it
              was provided. This can lead to the model generating text that is offensive
              or inappropriate.
            </p>
            <p className="mt-3">
              I have tried to mitigate this through the use of careful prompt engineering
              and by censoring particular input before sending it to the API.
              Additionally, I have implemented the OpenAI moderation endpoint to double
              check if any response contains offensive material. If it does, the response
              will not be displayed.
            </p>
          </article>
        </section>
      </main>
    </>
  );
};

export default About;
