import {Article} from "../../../types/Article.ts";

type ArticleDetailsCardProps = {
    article:Article;
};

export default function ArticleDetailsCard(props:Readonly<ArticleDetailsCardProps>):React.ReactElement {

    return (
        <h2>Kartoffel</h2>
    )
}