import './ArticleWindow.css';
import React, {useState} from "react";
import DraggableSubWindow from "../../_generic/parts/DraggableSubWindow.tsx";
import UpdateArticleForm from "./UpdateArticleForm.tsx";
import {Article} from "../../../types/Article.ts";
import ArticleCard from "./ArticleCard.tsx";

type ArticleWindowProps = {
    coordinates: {x:number, y:number};
    article:Article;
    title:string;
    updateArticle: (article:Article) => void;
    closeWindow: () => void;
}
export default function ArticleWindow(props:Readonly<ArticleWindowProps>):React.ReactElement {
    const [isBeingEdited, setIsBeingEdited] = useState<boolean>(false);
    const [article, setArticle] = useState<Article>(props.article);


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
                {!isBeingEdited && <button onClick={(): void => setIsBeingEdited(!isBeingEdited)}>Bearbeiten</button>}
            </div>
            {isBeingEdited ?
                <UpdateArticleForm
                    article={article}
                    updateArticle={props.updateArticle}
                    setIsBeingEdited={setIsBeingEdited}
                    setArticle={setArticle}
                />
                :
                <ArticleCard  article={article}/>
            }
        </DraggableSubWindow>
    )
}