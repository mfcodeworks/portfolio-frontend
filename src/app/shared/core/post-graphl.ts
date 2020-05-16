import { AuthorGraphQL } from './author-graphql';
import { CategoryGraphQL } from './category-graphql';
import { TagGraphQL } from './tag-graphql';
import { SlugGraphQL } from './slug-graphql';
import { ImageGraphQL } from './image-graphql';

export interface PostGraphQL {
    title?: string;
    slug?: SlugGraphQL;
    mainImage?: ImageGraphQL;
    bodyRaw?: any[];
    publishedAt: string;
    preview?: string;
    excerpt?: string;
    author?: AuthorGraphQL;
    categories?: CategoryGraphQL[];
    tags?: TagGraphQL[];
}