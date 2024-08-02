import React from "react";
import rehypeToc from "rehype-toc";
import rehypeSlug from "rehype-slug";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { MdSyntaxHighlighter } from "./MdSyntaxHighlighter";
import { cn } from "@/lib/utils";
type Props = {
  markdown: string;
};

function Markdown({ markdown }: Props) {
  return (
    <ReactMarkdown
      className={cn([
        "max-w-full",
        "prose dark:prose-invert",
        // Table overall styles
        "prose-table:border-separate prose-table:rounded-lg prose-table:shadow-md",
        "prose-table:border prose-table:border-gray-200 dark:prose-table:border-gray-700",

        // Table header styles
        "prose-th:bg-gray-100 dark:prose-th:bg-gray-800 prose-th:text-left prose-th:font-semibold",
        "prose-th:border prose-th:border-gray-200 dark:prose-th:border-gray-700",
        "prose-th:px-6 prose-th:py-4",

        // Table data cell styles
        "prose-td:border prose-td:border-gray-200 dark:prose-td:border-gray-700",
        "prose-td:px-6 prose-td:py-4 prose-td:bg-white dark:prose-td:bg-gray-900",
      ])}
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex, rehypeSlug, rehypeToc]}
      components={{
        code: (props) => {
          return <MdSyntaxHighlighter {...props} />;
        },
        table: (props) => {
          return (
            <div className="overflow-x-scroll">
              <table {...props} />
            </div>
          );
        },
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
}

export default Markdown;
