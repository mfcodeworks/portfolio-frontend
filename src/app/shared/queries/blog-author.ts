import gql from 'graphql-tag';

export const BlogAuthorPage = gql`query AuthorPage($slug: String) {
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