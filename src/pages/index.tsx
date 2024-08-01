import Link from "next/link";
import { GetStaticProps } from "next";
import { getDatabase } from "@/lib/notion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Meta from "@/components/Meta";

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getDatabase();
  return {
    props: {
      posts,
    },
  };
};

const Home = ({ posts }: { posts: any[] }) => {
  return (
    <>
      <Meta />
      <div className="p-8">
        <h2 className="mb-4 text-center text-2xl font-bold text-primary">
          ブログ一覧
        </h2>
        <div className="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.id} href={`/posts/${post.id}`}>
              <Card className="overflow-hidden rounded-lg bg-white shadow-lg transition-transform duration-500 hover:scale-105 dark:bg-gray-800">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600">
                  <h3 className="text-xl font-bold text-white">
                    {post.properties.Name.title[0].plain_text}
                  </h3>
                </CardHeader>
                <CardContent className="flex flex-col space-y-4 pt-4">
                  {post.properties.Tags.multi_select.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.properties.Tags.multi_select.map((tag: any) => (
                        <Badge key={tag.id} variant="secondary">
                          {tag.name}
                        </Badge>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <svg
                      className="mr-1 size-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M6 2a2 2 0 00-2 2v1H2v2h2v8H2v2h2v1a2 2 0 002 2h8a2 2 0 002-2v-1h2v-2h-2V7h2V5h-2V4a2 2 0 00-2-2H6z" />
                    </svg>
                    <span>{new Date(post.created_time).toISOString()}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
