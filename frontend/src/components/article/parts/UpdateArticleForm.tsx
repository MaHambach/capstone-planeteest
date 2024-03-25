import {Article} from "../../../types/Article.ts";

type UpdateArticleFormProps = {
    article:Article;
    closeArticleCard: () => void;
}

export default function UpdateArticleForm(props:Readonly<UpdateArticleFormProps>) {
    return (
        <div>{props.article.id}</div>
    )
}