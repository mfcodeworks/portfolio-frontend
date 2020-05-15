import gql from 'graphql-tag';

export const BlogPostPage = gql`query PostPage($slug: String) {
    allPost(where: {
        slug: {
            current: {
                eq: $slug
            }
        }
    }) {
        title
        slug {
            current
        }
        mainImage {
            asset {
                url
            }
        }
        bodyRaw
        preview
        author {
            name
            slug {
                current
            }
            image {
                asset {
                    url
                }
            }
        }
        categories {
            _id
            title
        }
        tags {
            title
            slug {
                current
            }
        }
        publishedAt
    }
}`;