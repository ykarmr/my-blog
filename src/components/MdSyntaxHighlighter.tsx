import type { ClassAttributes, HTMLAttributes } from "react";
import type { ExtraProps } from "react-markdown";
import { Prism as ReactSyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

type Props = ClassAttributes<HTMLElement> &
  HTMLAttributes<HTMLElement> &
  ExtraProps;

/**
 * React Markdownで利用するSyntaxHighlighter
 *
 * サポート言語
 * https://github.com/react-syntax-highlighter/react-syntax-highlighter/blob/master/AVAILABLE_LANGUAGES_PRISM.MD
 */
export const MdSyntaxHighlighter = (props: Props) => {
  const { className, children } = props;
  const match = /language-(\w+)/.exec(className || "");

  if (match) {
    return (
      <ReactSyntaxHighlighter
        // @ts-ignore
        style={a11yDark}
        language={match[1]}
        {...props}
      >
        {String(children).replace(/\n$/, "")}
      </ReactSyntaxHighlighter>
    );
  }

  return (
    <code
      className="inline rounded bg-gray-200 p-1 font-mono text-sm before:content-none after:content-none dark:bg-gray-500"
      {...props}
    >
      {children}
    </code>
  );
};
