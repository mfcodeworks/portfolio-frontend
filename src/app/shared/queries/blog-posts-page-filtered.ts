import gql from 'graphql-tag';

export const BlogPostsPageFiltered = gql`query BlogPostsFiltered(
        $ref: ID = "cb102938-9ff6-4b3e-ae0a-425fc9fac959"
        $limit: Int = 10
        $offset: Int = 0
    ) {
    allPost(
        limit: $limit
        offset: $offset
        where: {
            _: {
                references: $ref
            }
        }
        sort: [{
            publishedAt: DESC
        }]
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