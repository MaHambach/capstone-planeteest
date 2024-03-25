import React from "react";
import DraggableFrame from "../../parts/DraggableFrame.tsx";
import UpdateArticleForm from "./UpdateArticleForm.tsx";
import {Article} from "../../../types/Article.ts";
import ArticleCard from "./ArticleCard.tsx";

type ArticleFrameProps = {
    article:Article;
    title:string;
    closeArticleCard: () => void;
}
export default function ArticleFrame(props:Readonly<ArticleFrameProps>):React.ReactElement {
    const [isBeingEdited, setIsBeingEdited] = React.useState<boolean>(false);

    return (
        <DraggableFrame
            closeFrame={props.closeArticleCard}
            initialPosition={{left:0.5, top:200}}
        >
            <div className={"articleCardTitleLine"}>
                <span><b>{props.title}</b></span>
                <button onClick={(): void => setIsBeingEdited(!isBeingEdited)}>Bearbeiten</button>
            </div>
            {isBeingEdited ?
                <UpdateArticleForm
                    article={props.article}
                    closeArticleCard={props.closeArticleCard}
                />
                :
                <ArticleCard  article={props.article}/>
            }
        </DraggableFrame>
    )
}