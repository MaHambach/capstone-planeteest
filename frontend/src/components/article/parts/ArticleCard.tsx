import './ArticleCard.css'
import {Article} from "../../../types/Article.ts";
import DisplayTileGallery from "../../parts/DisplayTileGallery.tsx";
import React from "react";

type ArticleDetailsCardProps = {
    article:Article;
};

export default function ArticleCard(props:Readonly<ArticleDetailsCardProps>):React.ReactElement {

    return (
        <div className={"articleCard"}>
            <article>{props.article.content}</article>
            {props.article.npcIds.length > 0 &&
                <DisplayTileGallery
                    urlPrefix={"/npc/"}
                    tileData={props.article.npcIds.map((npcId: string) => ({
                        id: npcId,
                        name: "Jürgen"
                    }))} /* For later: get the npc name, when there are npcs. */
                    addNewName={"Neuer Nsc"}
                    addNewUrl={"/npc/new"}
                    tileSize={100}
                />}
        </div>
    )
}