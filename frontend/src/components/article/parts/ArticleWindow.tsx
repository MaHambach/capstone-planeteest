import './ArticleWindow.css';
import React from "react";
import DraggableSubWindow from "../../parts/DraggableSubWindow.tsx";
import UpdateArticleForm from "./UpdateArticleForm.tsx";
import {Article} from "../../../types/Article.ts";
import ArticleCard from "./ArticleCard.tsx";

type ArticleWindowProps = {
    coordinates: {x:number, y:number};
    article:Article;
    title:string;
    closeWindow: () => void;
}
export default function ArticleWindow(props:Readonly<ArticleWindowProps>):React.ReactElement {
    const [isBeingEdited, setIsBeingEdited] = React.useState<boolean>(false);

    return (
        <DraggableSubWindow
            closeFrame={props.closeWindow}
            initialPosition={{
                left: props.coordinates.x + 250,
                top: props.coordinates.y,
                width:640,
                height:800
        }}>
            <div className={"articleWindowTitleLine"}>
                <span><b>{props.title}</b></span>
                <button onClick={(): void => setIsBeingEdited(!isBeingEdited)}>Bearbeiten</button>
            </div>
            {isBeingEdited ?
                <UpdateArticleForm
                    article={props.article}
                    closeArticleCard={props.closeWindow}
                />
                :
                <ArticleCard  article={props.article}/>
            }
        </DraggableSubWindow>
    )
}