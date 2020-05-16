import gql from 'graphql-tag';

export const Tag = gql`query Tag ($name: String = "cms") {
    allTags (where: {
        title: {
            eq: $name
        }
    }) {
        _id
    }
}`;