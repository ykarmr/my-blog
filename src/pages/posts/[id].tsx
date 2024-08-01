import { GetStaticPaths, GetStaticProps } from "next";
import { getDatabase, getPage, notionToMd } from "@/lib/notion";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import "katex/dist/katex.min.css";
import { Badge } from "@/components/ui/badge";
import Meta from "@/components/Meta";
import rehypeToc from "rehype-toc";
import rehypeSlug from "rehype-slug";

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
      <article className="prose mx-auto w-full dark:prose-invert ">
        {tags.some((item: any) => item.name === "Notion AI") && (
          <div className="rounded bg-red-100 p-4 text-red-700 dark:bg-red-900 dark:text-red-200">
            こちらの記事はNotion AIで作成されたものなので、
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
        <Markdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex, rehypeSlug, rehypeToc]}
        >
          {markdown}
        </Markdown>
      </article>
    </>
  );
};

export default Post;
