import gql from 'graphql-tag';

export const BlogAuthor = gql`query BlogAuthor($slug: String) {
    allAuthor(where: {
        slug: {
            current: {
                eq: $slug
            }
        }
    }) {
        name
        slug {
            current
        }
        image {
            asset {
              	url
            }
        }
        bioRaw
        twitter
    }
}`;