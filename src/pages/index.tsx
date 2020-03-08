import SEO from '../components/seo';
import Bio from '../components/bio';
import Layout from '../components/layout';
import { rhythm } from '../utils/typography';

import React from 'react';
import { Link, graphql } from 'gatsby';
import 'moment/locale/ja';
import moment from 'moment';

declare interface PageListObject {
  site: {
    siteMetadata: {
      title: string;
    };
  };
  allFile: {
    nodes: Array<{
      extension: string;
      childAsciidoc: {
        fields: {
          slug: string;
        };
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
      childMarkdownRemark: {
        excerpt: string;
        fields: {
          slug: string;
        };
        frontmatter: {
          date: Date;
          title: string;
        };
      };
    }>;
  };
}

type ListItemObject = {
  slug: string;
  title: string;
  description: string;
  date: Date;
};

export default (result: { data: PageListObject; location: { pathname: string } }) => {
  const data: PageListObject = result.data;
  const pages = data.allFile.nodes
    .filter((node) => {
      return node.extension === 'adoc' || node.extension === 'md';
    })
    .map((node) => {
      if (node.extension === 'adoc') {
        const child = node.childAsciidoc;
        const item: ListItemObject = {
          slug: child.fields.slug,
          title: child.document.title,
          description: child.pageAttributes.description,
          date: child.revision.date,
        };
        return item;
      } else {
        const child = node.childMarkdownRemark;
        const item: ListItemObject = {
          slug: child.fields.slug,
          title: child.frontmatter.title,
          description: child.excerpt,
          date: child.frontmatter.date,
        };
        return item;
      }
    })
    .sort((a, b) => moment(b.date).diff(moment(a.date)));

  return (
    <Layout location={result.location} title={data.site.siteMetadata.title}>
      <SEO title="All posts" />
      <Bio />
      {pages.map((page) => {
        return (
          <article key={page.slug}>
            <header>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={page.slug}>
                  {page.title}
                </Link>
              </h3>
              <small>{moment(page.date).format('lll')}</small>
            </header>
            <section>
              <p dangerouslySetInnerHTML={{ __html: page.description }} />
            </section>
          </article>
        );
      })}
    </Layout>
  );
};

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allFile(filter: { sourceInstanceName: { eq: "blog" }, extension: { regex: "/(md|adoc)/" } }) {
      nodes {
        extension
        childAsciidoc {
          fields {
            slug
          }
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
        childMarkdownRemark {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date
            title
          }
        }
      }
    }
  }
`;
