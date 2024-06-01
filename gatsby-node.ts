import path from "path";
import type { GatsbyNode } from "gatsby";
import { createFilePath } from "gatsby-source-filesystem";
import { PostListItemType } from "types/PostItem.types";

// Setup Import Alias
export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({ actions }) => {
    actions.setWebpackConfig({
        resolve: {
            alias: {
                components: path.resolve(__dirname, "src/components"),
                utils: path.resolve(__dirname, "src/utils"),
                hooks: path.resolve(__dirname, "src/hooks"),
            }
        }
    })
}

// Generate a Slug Each Post Data
export const onCreateNode: GatsbyNode["onCreateNode"] = ({ node, getNode, actions }) => {
    const { createNodeField } = actions;

    if (node.internal.type === `MarkdownRemark`) {
        const slug = createFilePath({ node, getNode });

        createNodeField({ node, name: 'slug', value: slug });
    }
}

// Generate Post Page Through Markdown Data
export const createPages: GatsbyNode["createPages"] = async ({ actions, graphql, reporter }) => {
    const { createPage } = actions;

    // Get All Markdown File For Paging
    const result = await graphql<{ allMarkdownRemark: { edges: PostListItemType[] } }>(`
        query resultQuery {
            allMarkdownRemark(
                sort: [{ frontmatter: { date: DESC } }, { frontmatter: { title: DESC } }]
            ) {
                edges {
                    node {
                        fields {
                            slug
                        }
                    }
                }
            }
        }     
    `);

    // Handling GraphQL Query Error
    if (result.errors) {
        reporter.panicOnBuild(`Error while running query`);
        return;
    }

    result.data?.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
            path: node.fields.slug,
            component: path.resolve(__dirname, "src/templates/post_template.tsx"),
            context: { slug: node.fields.slug }
        });
    })
}