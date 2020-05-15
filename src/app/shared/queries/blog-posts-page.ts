import gql from 'graphql-tag';

export const BlogPostsPage = gql`query PostsPage(
    $limit: Int = 10
    $offset: Int = 0
) {
    allPost(
        limit: $limit
        offset: $offset
    ) {
        title
        slug {
            current
        }
        mainImage {
            asset {
                url
            }
        }
        excerpt
        author {
            name
            slug {
                current
            }
        }
        categories {
            _id
            title
        }
        publishedAt
        tags {
            title
            slug {
                current
            }
        }
    }
    allCategory {
        title
    }
    allTags {
        title
        slug {
            current
        }
    }
}`;