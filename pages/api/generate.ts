import { NextApiRequest, NextApiResponse } from "next";
import sendOpenAIRequest from "../../backend/sendOpenAIRequest";
import ServerError from "../../util/ServerError";

import { responseBodySchema } from "../../validationSchema";

const handler = async (req: NextApiRequest, res: NextApiResponse<unknown>) => {
   try {
      res.setHeader("Allow", "POST");

      if (req.method !== "POST") {
         throw new ServerError("Only POST requests are permitted.", 405);
      }

      const { body } = req;
      const parseBody = responseBodySchema.safeParse(body);

      if (!parseBody.success) {
         throw new ServerError(
            "Your request body is invalid. Cuisine and keywords are required.",
            400
         );
      }

      const openAIResponse = await sendOpenAIRequest(parseBody.data);
      res.statusCode = 201;
      res.send(openAIResponse);
   } catch (error) {
      const message = error instanceof ServerError ? error.message : "Something went wrong.";
      const status = error instanceof ServerError ? error.status : 500;

      res.statusCode = status;
      res.send({
         message,
         status,
         success: false,
      });
   }
};

export default handler;
