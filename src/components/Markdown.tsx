import React from "react";
import rehypeToc from "rehype-toc";
import rehypeSlug from "rehype-slug";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { MdSyntaxHighlighter } from "./MdSyntaxHighlighter";
type Props = {
  markdown: string;
};

function Markdown({ markdown }: Props) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex, rehypeSlug, rehypeToc]}
      components={{
        code: (props) => {
          return <MdSyntaxHighlighter {...props} />;
        },
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
}

export default Markdown;
