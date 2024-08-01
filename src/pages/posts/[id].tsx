import { GetStaticPaths, GetStaticProps } from "next";
import { getDatabase, getPage, notionToMd } from "@/lib/notion";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import "katex/dist/katex.min.css";
import { Badge } from "@/components/ui/badge";

export const getStaticPaths: GetStaticPaths = async () => {
  const database = await getDatabase();
  return {
    paths: database.map((page) => ({ params: { id: page.id } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const page = await getPage(params?.id as string);
  const markdown = await notionToMd(params?.id as string);
  return {
    props: {
      page,
      markdown,
    },
  };
};

const Post = ({ page, markdown }: { page: any; markdown: string }) => {
  const tags = page.properties.Tags.multi_select;
  return (
    <article className="prose dark:prose-invert w-full mx-auto ">
      {tags.some((item) => item.name === "Notion AI") && (
        <div className="rounded bg-red-100 p-4 text-red-700 dark:bg-red-900 dark:text-red-200">
          こちらの記事はNotion AIで作成されたものなので、
          <br />
          正しい情報であることは保証しません。
        </div>
      )}
      <h2 className="text-3xl font-bold text-primary">
        {page.properties.Name.title[0].plain_text}
      </h2>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag: any) => (
            <Badge key={tag.id} variant="secondary">
              {tag.name}
            </Badge>
          ))}
        </div>
      )}
      <Markdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
      >
        {markdown}
      </Markdown>
    </article>
  );
};

export default Post;
