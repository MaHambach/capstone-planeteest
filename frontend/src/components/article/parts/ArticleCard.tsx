import './ArticleCard.css'
import {Article} from "../../../types/Article.ts";
import DisplayTileGallery from "../../parts/DisplayTileGallery.tsx";
import React from "react";
import Draggable from "react-draggable";
import HeaderDraggableFrame from "../../parts/HeaderDraggableFrame.tsx";
import UpdateArticleForm from "./UpdateArticleForm.tsx";

type ArticleDetailsCardProps = {
    title:string;
    article:Article;
    closeArticleCard: () => void;
};

export default function ArticleCard(props:Readonly<ArticleDetailsCardProps>):React.ReactElement {
    const [isBeingEdited, setIsBeingEdited] = React.useState<boolean>(false);
    const nodeRef = React.useRef(null);

    return (
        <Draggable
            handle={"strong"}
            defaultPosition={{x:100, y:200}}
            nodeRef={nodeRef}
        >
            <div className={"articleCardFrame"}>
                <HeaderDraggableFrame closeWindow={props.closeArticleCard} nodeRef={nodeRef} />
                <div>
                    <span>{props.title}</span>
                    <button onClick={():void => setIsBeingEdited(!isBeingEdited)}>Bearbeiten</button>
                </div>
                {isBeingEdited ?
                    <UpdateArticleForm
                        article={props.article}
                        closeArticleCard={props.closeArticleCard}
                    />
                    :
                    <div className={"articleCard"}>
                        <article>{props.article.content}</article>
                        {props.article.npcIds.length > 0 &&
                            <DisplayTileGallery
                                urlPrefix={"/npc/"}
                                tileData={props.article.npcIds.map((npcId:string) => ({id:npcId, name:"Jürgen"}))} /* For later: get the npc name, when there are npcs. */
                                addNewName={"Neuer Nsc"}
                                addNewUrl={"/npc/new"}
                                tileSize={100}
                        />}
                    </div>
                }
            </div>
        </Draggable>

    )
}