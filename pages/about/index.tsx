import React from 'react';
import type { NextPage } from 'next';

const About: NextPage = () => {
  return (
    <main className="container mx-auto">
      <section className="mt-10 lg:mt-20 mb-10 mx-6">
        <h1 className="font-bold text-5xl">About</h1>
        <article>
          <h2 className="font-bold text-xl mt-3">What is SpoonBot?</h2>
          <p className="mt-3">
            SpoonBot is a restaurant naming bot powered by GPT-3 and created by Aaron Po.
            It uses user provided input to generate a prompt which is sent in a completion
            request to the OpenAI GPT-3 API.
          </p>
        </article>
        <article>
          <h2 className="font-bold text-xl mt-3">What is GPT-3?</h2>
          <p className="mt-3">
            Generative Pre-trained Transformer 3 (GPT-3) is a natural language processing
            model that uses a deep learning technique to generate human-like text. It was
            developed by OpenAI, a research lab focused on artificial intelligence and
            machine learning.
          </p>
          <p className="mt-3">
            GPT-3 is trained on a large corpus of text, such as books, articles, and
            conversation transcripts. The training data is used to create a statistical
            model of the relationships between words and phrases. The model can then be
            used to generate new text by predicting the next word or phrase in a sequence.
          </p>
          <h3 className="text-lg mt-3 font-semibold">Bias Disclaimer</h3>
          <p className="mt-3">
            As GPT-3 is trained on a vast amount of data, a particular response may
            contain any bias from the data sources it was trained on. That is to say, if
            GPT-3 is trained on a dataset that is biased against a certain group of
            people, then it may output results that reflect that bias.
          </p>
        </article>
        <p className="mt-3">
          I have tried to mitigate this by the use of careful prompt engineering and by
          censoring particular words and phrases so they are not used in the prompt.
        </p>
      </section>
    </main>
  );
};

export default About;
