import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm, scale } from '../utils/typography';
import 'moment/locale/ja';

import React from 'react';
import moment from 'moment';
import { graphql } from 'gatsby';

declare interface PostObject {
  site: {
    siteMetadata: {
      title: string;
    };
  };
  markdownRemark: {
    html: string;
    excerpt: string;
    frontmatter: {
      title: string;
      date: Date;
    };
  };
  asciidoc: {
    html: string;
    document: {
      title: string;
    };
    revision: {
      date: Date;
    };
    pageAttributes: {
      description: string;
    };
  };
}
declare interface PageObject {
  title: string;
  body: string;
  date: Date;
  description: string;
}

const formatPage: (data: PostObject) => PageObject = (data) => {
  if (data.markdownRemark) {
    const post = data.markdownRemark;
    const formatPage: PageObject = {
      title: post.frontmatter.title,
      body: post.html,
      date: post.frontmatter.date,
      description: post.excerpt,
    };
    return formatPage;
  } else if (data.asciidoc) {
    const post = data.asciidoc;
    const formatPage: PageObject = {
      title: post.document.title,
      body: post.html,
      date: post.revision.date,
      description: post.pageAttributes.description,
    };
    return formatPage;
  }
  const errorPage: PageObject = {
    title: 'エラー',
    body: 'エラー',
    date: new Date(),
    description: 'エラー',
  };
  return errorPage;
};

export default (node: { data: PostObject; location: { pathname: string } }) => {
  const data: PostObject = node.data;
  const page = formatPage(data);
  return (
    <Layout location={node.location} title={data.site.siteMetadata.title}>
      <SEO title={page.title} description={page.description} />
      <article>
        <header>
          <h1
            style={{
              marginTop: rhythm(1),
              marginBottom: 0,
            }}
          >
            {page.title}
          </h1>
          <p
            style={{
              ...scale(-1 / 5),
              display: `block`,
              marginBottom: rhythm(1),
            }}
          >
            <time dateTime={moment(page.date).format()}>{moment(page.date).format('lll')}</time>
          </p>
        </header>
        <section dangerouslySetInnerHTML={{ __html: page.body }} />
        <script src="/assets/javascripts/highlighting-prism.js"></script>
      </article>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      frontmatter {
        title
        date
      }
    }
    asciidoc(fields: { slug: { eq: $slug } }) {
      html
      document {
        title
      }
      revision {
        date
      }
      pageAttributes {
        description
      }
    }
  }
`;
