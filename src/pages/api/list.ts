// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import modelPost from "../../models/post";
import { Post } from "../../components/Editor/Editor";
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const listPost = modelPost().findAll() as Post[];
  if (listPost === null)
    res.json({
      data: [],
      length: 0,
    });

  const data = listPost.map((val, index) => {
    return {
      title: val.title,
      description: val.description,
      keyword: val.keyword,
    };
  });

  res.json({
    data: data,
    length: data.length,
  });
}
