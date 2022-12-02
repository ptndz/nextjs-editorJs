import orm from "ormjson";
import path from "path";

import { Post } from "../components/Editor/Editor";

const jsonDirectory = path.join(process.cwd(), "data");
function modelPost() {
  return new orm<Post>(jsonDirectory + "/post.json");
}

export default modelPost;
