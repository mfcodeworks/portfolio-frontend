import gql from 'graphql-tag';

export const HomePage = gql`query HomePage {
    allTools {
        title
        logo {
            asset {
                url
            }
        }
    }
}`;