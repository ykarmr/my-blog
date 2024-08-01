import Head from "next/head";
import React from "react";

type Props = {
  pageTitle?: string;
  pagePath?: string;
};

function Meta(props: Props) {
  const { pageTitle, pagePath } = props;
  const defaultTitle = "YKARMR BLOG";
  const title = pageTitle ? `${defaultTitle} | ${pageTitle}` : defaultTitle;

  const baseURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://ykarmr.github.io/my-blog";

  const url = pagePath ? baseURL + pagePath : baseURL;

  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <meta name="description" content={pageTitle} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={title} />
      <meta property="og:description" content={pageTitle} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={`${baseURL}/meta.webp`} />
      <meta property="og:image:width" content={String(1280)} />
      <meta property="og:image:height" content={String(640)} />
      <link rel="canonical" href={url} />
      <link rel="icon" href={`${baseURL}/favicon.webp`} key="icon" />
    </Head>
  );
}

export default Meta;
