// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import modelPost from "../../models/post";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { title, description, content, keyword } = JSON.parse(req.body);
    const data = modelPost().create({
      title: title,
      description: description,
      content: content,
      keyword: keyword,
    });

    res.json(data);
  } else if (req.method === "GET") {
    const listPost = modelPost().findAll();
    res.json({
      data: listPost,
    });
  }
}
