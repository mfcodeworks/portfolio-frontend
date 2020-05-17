import gql from 'graphql-tag';

export const HomePage = gql`query Home(
    $limit: Int = 3
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
    allTools {
        title
        logo {
            asset {
                url
            }
        }
    }
}`;