# SpoonBot

SpoonBot is a web application that uses AI to generate restaurant names, reviews, and menus.

This app uses Next.js, TailwindCSS, and OpenAI&apos;s GPT-3 API. It also uses Auth0 for authentication and Upstash Redis to handle rate limiting.

## Running the app locally

This section assumes you have obtained an OpenAI API key as well as have made accounts for Auth0 and Upstash.

1. Clone the repo
2. `cd` into the project directory
3. Create a `.env.local` file in the project directory
4. Add the following environment variables to the `.env.local` file:

```env
OPENAI_API_KEY=YOUR_OPENAI_API_KEY
AUTH0_SECRET=YOUR_AUTH0_SECRET
AUTH0_BASE_URL=http://localhost:3000
AUTH0_ISSUER_BASE_URL=YOUR_AUTH0_ISSUER_BASE_URL
AUTH0_CLIENT_ID=YOUR_AUTH0_CLIENT_ID
AUTH0_CLIENT_SECRET=YOUR_AUTH0_CLIENT_SECRET
NEXTAUTH_URL=http://localhost:3000
REDIS_URL=YOUR_REDIS_URL
```

5. In the project directory, run `npm install` to install dependencies
6. Run `npm run dev` to start the app on `localhost:3000`

## Contributing

I am open to contributions. Feel free to submit a pull request.

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Contact

[Aaron William Po](https://aaronwilliampo.com)

## Credit

This app was inspired by [OpenAI&apos;s GPT-3 API](https://openai.com/blog/openai-api/).

## Disclaimer

This app is for educational purposes only. It is not intended to be used to generate offensive content. I have implemented various safety measures to ensure that data sent to and from the API does not contain inappropriate content. All prompt inputs (eg. keyword input) are screened for potentially offensive language before being sent to the API. All generated text is also screened before being returned to the user. If the model generates inappropriate content, the user will be prompted to try again.

GPT-3 is a powerful tool, but it is not perfect. As it is trained on a large corpus of text, it can sometimes pick up on biases in the training data it was provided. This can lead to the model generating texts that contain these biases. It is important to be aware of this while using SpoonBot.
