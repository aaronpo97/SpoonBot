import { NextApiRequest, NextApiResponse } from "next";

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
   apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// const response = await openai.createCompletion({
//    model: "text-curie-001",
//    prompt:
//       "Give me 5 possible names for the following restaurant: \n\nCuisine: Asian fusion\n\nMenu consists of: Sushi, karaage fried chicken, tempura, Korean bbq\n\nCity: Seattle Washington\n\nPrice: $$$$\n\n",
//    temperature: 0.8,
//    max_tokens: 60,
//    top_p: 1,
//    frequency_penalty: 0,
//    presence_penalty: 0,
// });

interface ResponseBody {
   keywords: string[];
   cuisine: string;
}
const service = async ({ keywords, cuisine }: ResponseBody) => {
   const prompt = `
   Generate a name for the following restaurant: 
   keywords: ${JSON.stringify(keywords)}
   cuisine: ${cuisine}
   name:`;

   const result = await openai.createCompletion({
      model: "text-curie-001",
      max_tokens: 100,
      prompt,
   });

   return result.data.choices;
};
interface Response {
   status: number;
   message: string;
   success: boolean;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<unknown>) {
   if (req.method !== "POST") {
      res.statusCode = 405;
      res.setHeader("Allow", "POST");
      res.send({
         message: "Only POST requests are permitted.",
         status: res.statusCode,
         success: false,
      });
   }

   const body = req.body as ResponseBody;

   const stuff = await service(body);
   res.send(stuff);
}
