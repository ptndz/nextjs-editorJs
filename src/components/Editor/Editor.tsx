import { useEffect, useRef, useState, ReactNode, Fragment } from "react";

import EditorJS, { API, OutputData } from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS } from "./tools";

export interface Post {
  title: string;
  content: OutputData;
  keyword: string;
  description: string;
}

type ArticleEditorProps = {
  children: ReactNode;
  defaultValue: OutputData;
  placeholder?: string;
  readOnly?: boolean;
  minHeight?: number;
  idPost: string;
  onReady: () => void;
  onSave: (data: Post) => void;
  onChange: (api: API, event: CustomEvent) => void;
};

const ArticleEditor = ({
  children,
  defaultValue,
  placeholder,
  readOnly,
  minHeight,
  idPost,
  onReady,
  onChange,
  onSave,
}: ArticleEditorProps) => {
  const editorJS = useRef<EditorJS | null>(null);

  const [currentArticle, setCurrentArticle] = useState<OutputData | null>(null);
  const [postTitle, setPostTitle] = useState("1");
  const [postKeyword, setPostKeyword] = useState("2");
  const [postDescription, setPostDescription] = useState("3");

  useEffect(() => {
    if (editorJS.current === null) {
      editorJS.current = new EditorJS({
        placeholder,
        readOnly,
        minHeight,
        holder: idPost,
        data: defaultValue,

        tools: EDITOR_JS_TOOLS,
        onChange(api: API, event: CustomEvent) {
          editorJS.current?.save().then((res) => {
            setCurrentArticle(res);
          });
          onChange(api, event);
        },
        onReady() {
          onReady();
        },
      });
    }
  }, [
    currentArticle,
    defaultValue,
    idPost,
    minHeight,
    onChange,
    onReady,
    onSave,
    placeholder,
    postDescription,
    postKeyword,
    postTitle,
    readOnly,
  ]);
  useEffect(() => {
    onSave({
      title: postTitle,
      content: currentArticle,
      description: postDescription,
      keyword: postKeyword,
    });
  }, [currentArticle, onSave, postDescription, postKeyword, postTitle]);
  const onChangeTitle = (event) => {
    setPostTitle(event.target.value);
  };
  const onChangeDescription = (event) => {
    setPostDescription(event.target.value);
  };
  const onChangeKeyword = (event) => {
    setPostKeyword(event.target.value);
  };
  return (
    <Fragment>
      <div>
        <span>Title</span>
        <input type="text" onChange={onChangeTitle} value={postTitle} />
      </div>
      <div>
        <span>Description</span>
        <input
          type="text"
          onChange={onChangeDescription}
          value={postDescription}
        />
      </div>
      <div>
        <span>Key word</span>
        <input type="text" onChange={onChangeKeyword} value={postKeyword} />
      </div>
      <div id={idPost} />
      <div>{children}</div>
    </Fragment>
  );
};

ArticleEditor.defaultProps = {
  placeholder: "",
  readOnly: false,
  minHeight: 0,
};

export default ArticleEditor;
