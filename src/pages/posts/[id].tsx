import { GetStaticPaths, GetStaticProps } from "next";
import { getDatabase, getPage, notionToMd } from "@/lib/notion";

import "katex/dist/katex.min.css";
import { Badge } from "@/components/ui/badge";
import Meta from "@/components/Meta";
import Markdown from "@/components/Markdown";
import { cn } from "@/lib/utils";

export const getStaticPaths: GetStaticPaths = async () => {
  const database = await getDatabase();
  return {
    paths: database.map((page) => ({ params: { id: page.id } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const pageId = params?.id as string;
  const page = await getPage(pageId);
  const markdown = await notionToMd(pageId);

  return {
    props: {
      pageId,
      page,
      markdown,
    },
  };
};

const Post = ({
  pageId,
  page,
  markdown,
}: {
  pageId: string;
  page: any;
  markdown: string;
}) => {
  const tags = page.properties.Tags.multi_select;
  const title = page.properties.Name.title[0].plain_text;
  return (
    <>
      <Meta pageTitle={title} pagePath={`/posts/${pageId}`} />
      <article
        className={cn([
          "mx-auto w-full",
          "prose dark:prose-invert",
          // Table overall styles
          "prose-table:border-separate prose-table:rounded-lg prose-table:overflow-hidden prose-table:shadow-md",
          "prose-table:border prose-table:border-gray-200 dark:prose-table:border-gray-700",
          "prose-table:w-full",

          // Table header styles
          "prose-th:bg-gray-100 dark:prose-th:bg-gray-800 prose-th:text-left prose-th:font-semibold",
          "prose-th:border prose-th:border-gray-200 dark:prose-th:border-gray-700",
          "prose-th:px-6 prose-th:py-3",

          // Table data cell styles
          "prose-td:border prose-td:border-gray-200 dark:prose-td:border-gray-700",
          "prose-td:px-6 prose-td:py-4 prose-td:bg-white dark:prose-td:bg-gray-900",
        ])}
      >
        {tags.some((item: any) => item.name === "Notion AI") && (
          <div className="rounded bg-red-100 p-4 text-red-700 dark:bg-red-900 dark:text-red-200">
            Notion AIで作成された記事です。
            <br />
            正しい情報であることは保証しません。
          </div>
        )}
        <h2 className="text-3xl font-bold text-primary">{title}</h2>
        {tags.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            {tags.map((tag: any) => (
              <Badge key={tag.id} variant="secondary">
                {tag.name}
              </Badge>
            ))}
          </div>
        )}

        <Markdown markdown={markdown} />
      </article>
    </>
  );
};

export default Post;
