import { SlugGraphQL } from './slug-graphql';
import { ImageGraphQL } from './image-graphql';

export interface AuthorGraphQL {
    name?: string;
    slug?: SlugGraphQL;
    image?: ImageGraphQL;
    bioRaw?: any;
}