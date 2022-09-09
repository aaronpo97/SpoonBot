import openai from "../config/openai";
import ServerError from "../util/ServerError";
import { ResponseBody } from "../validationSchema";

const generatePrompt = ({ keywords, cuisine }: ResponseBody) => `
          Generate a new name for the following restaurant: 
               keywords: ${JSON.stringify(keywords)}
               cuisine: ${cuisine}
               name:
     `;

const sendOpenAIRequest = async ({ keywords, cuisine }: ResponseBody) => {
   try {
      const result = await openai.createCompletion({
         model: "text-curie-001",
         prompt: generatePrompt({ keywords, cuisine }),
      });

      return result.data.choices![0].text!.replace(/[\r\n]/gm, "");
   } catch {
      throw new ServerError("The server failed to send a request to OpenAI.", 500);
   }
};

export default sendOpenAIRequest;
