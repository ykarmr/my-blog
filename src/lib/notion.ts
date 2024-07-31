import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function getDatabase() {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      // 公開状態の記事のみ取得(public pr draft)
      property: "status",
      select: {
        equals: "public",
      },
    },
  });
  return response.results;
}

export async function getPage(pageId: string) {
  const response = await notion.pages.retrieve({ page_id: pageId });
  return response;
}

export async function notionToMd(pageId: string) {
  const n2m = new NotionToMarkdown({ notionClient: notion });
  const mdblocks = await n2m.pageToMarkdown(pageId);
  const mdString = n2m.toMarkdownString(mdblocks);
  return mdString.parent;
}
