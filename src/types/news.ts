export interface NewsImageSize {
    s: string;
    m: string;
    l: string;
    hd: string;
}

export interface NewCover {
    type: "gallery" | string;
    images: NewsImageSize[];
}

export interface NewsRubrics {
    id: number;
    slug: string;
    name: string;
}

export interface NewsItem {
    id: string;
    title: string;
    cover: NewCover | null;
    likeCount: number;
    viewCount: number;
    publishedAt: string;
    rubrics: NewsRubrics[];
}

export interface ApiRecovery {
    totalPages: number;
    perPage: number;
    news: NewsItem[];
    minDatePublication: string;
}