import './ArticleWindow.css';
import React from "react";
import DraggableSubWindow from "../../parts/DraggableSubWindow.tsx";
import UpdateArticleForm from "./UpdateArticleForm.tsx";
import {Article} from "../../../types/Article.ts";
import ArticleCard from "./ArticleCard.tsx";

type ArticleFrameProps = {
    article:Article;
    title:string;
    closeFrame: () => void;
}
export default function ArticleWindow(props:Readonly<ArticleFrameProps>):React.ReactElement {
    const [isBeingEdited, setIsBeingEdited] = React.useState<boolean>(false);

    return (
        <DraggableSubWindow
            closeFrame={props.closeFrame}
            initialPosition={{left:200, top:200, width:640, height:800}}
        >
            <div className={"articleCardTitleLine"}>
                <span><b>{props.title}</b></span>
                <button onClick={(): void => setIsBeingEdited(!isBeingEdited)}>Bearbeiten</button>
            </div>
            {isBeingEdited ?
                <UpdateArticleForm
                    article={props.article}
                    closeArticleCard={props.closeFrame}
                />
                :
                <ArticleCard  article={props.article}/>
            }
        </DraggableSubWindow>
    )
}