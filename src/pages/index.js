import React from 'react';
import { Link, graphql } from 'gatsby';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm } from '../utils/typography';

const Tag = ({ tag, index }) => (
  <>
    {index !== 0 && <>, </>}
    <>{tag} </>
  </>
);

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title;
    const posts = data.allMarkdownRemark.edges;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="Home"
          keywords={[
            `blog`,
            `portfolio`,
            `Joseph Abell`,
            `react`,
            `javascript`
          ]}
        />
        <Bio />
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug;
          const tags = (node.frontmatter.tags || '').split(', ');
          return (
            <div key={node.fields.slug}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                  marginTop: 0
                }}
              >
                <Link
                  style={{ boxShadow: `none`, color: `rgba(107,187,233,1)` }}
                  to={node.fields.slug}
                >
                  {title}
                </Link>
              </h3>
              <small>
                {node.frontmatter.date}
                {tags[0].length > 0 && (
                  <>
                    {' '}
                    -{' '}
                    {tags.map((tag, index) => (
                      <Tag tag={tag} key={tag} index={index} />
                    ))}
                  </>
                )}
              </small>
              <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
            </div>
          );
        })}
      </Layout>
    );
  }
}

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            tags
          }
        }
      }
    }
  }
`;
