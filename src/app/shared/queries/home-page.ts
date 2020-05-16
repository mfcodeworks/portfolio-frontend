import gql from 'graphql-tag';

export const HomePage = gql`query Home {
    allTools {
        title
        logo {
            asset {
                url
            }
        }
    }
}`;