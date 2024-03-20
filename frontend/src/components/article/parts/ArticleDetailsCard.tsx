import './ArticleDetailsCard.css'
import {Article} from "../../../types/Article.ts";
import DisplayTileGallery from "../../parts/DisplayTileGallery.tsx";
import React from "react";

type ArticleDetailsCardProps = {
    article:Article;
};

export default function ArticleDetailsCard(props:Readonly<ArticleDetailsCardProps>):React.ReactElement {

    return (
        <div className={"articleDetailsCard"}>
            <article>{props.article.content}</article>
            <DisplayTileGallery
                urlPrefix={"/npc/"}
                tileData={props.article.npcIds.map((npcId:string) => ({id:npcId, name:"Jürgen"}))} /* TODO: get the npc name, when there are npcs. */
                addNewName={"Neuer Nsc"}
                addNewUrl={"/npc/new"}
            />
        </div>
    )
}