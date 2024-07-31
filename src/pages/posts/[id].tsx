import { GetStaticPaths, GetStaticProps } from "next";
import { getDatabase, getPage, notionToMd } from "@/lib/notion";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import "katex/dist/katex.min.css";

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
  return (
    <article className="prose dark:prose-invert w-full mx-auto">
      <h2 className="mb-8 text-3xl font-bold text-primary">
        {page.properties.Name.title[0].plain_text}
      </h2>
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
