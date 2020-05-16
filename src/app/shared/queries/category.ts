import gql from 'graphql-tag';

export const Category = gql`query Category ($name: String = "cms") {
    allCategory (where: {
        title: {
            eq: $name
        }
    }) {
        _id
    }
}`;