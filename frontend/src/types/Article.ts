export type Article = {
    id: string,
    content: string,
    npcIds: string[]
};

export const emptyArticle: Article = {
    id: '',
    content: '',
    npcIds: []
};
