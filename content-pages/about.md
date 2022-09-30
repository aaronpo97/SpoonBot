# About

## What is SpoonBot?

SpoonBot is a web application that uses OpenAI&apos;s GPT-3 API to generate restaurant names, reviews, and menus.

## What is GPT-3?

Generative Pre-trained Transformer 3 (GPT-3) is a natural language processing model that uses deep learning to generate human-like text. It is developed by OpenAI, a research lab focused on artificial intelligence and machine learning. GPT-3 is trained on a large corpus of text, such as books, articles, and conversation transcripts. The model creates text by predicting the next word in a sequence by analyzing the words that come before it.

## Safety

I have implemented various safety measures to ensure that data sent to and from the API does not contain inappropriate content.
All prompt inputs (eg. keyword input) are screened for potentially offensive language before being sent to the API. All generated text is also screened before being returned to the user. If the model generates inappropriate content, the user will be prompted to try again.

## Bias Disclaimer

GPT-3 is a powerful tool, but it is not perfect. As it is trained on a large corpus of text, it can sometimes pick up on biases in the training data it was provided. This can lead to the model generating texts that contain these biases. It is important to be aware of this while using SpoonBot.

## Credit

SpoonBot is built by [Aaron William Po](https://aaronwilliampo.com) using [Next.js](https://nextjs.org/), [TailwindCSS](https://tailwindcss.com/), and [OpenAI&apos;s GPT-3 API](https://openai.com/blog/openai-api/). The source code is available on [GitHub](https://github.com/aaronpo97/SpoonBot).
