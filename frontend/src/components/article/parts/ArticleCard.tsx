import './ArticleCard.css';
import '../../_generic/editor/RichTextEditor.css';
import {Article} from "../../../types/Article.ts";
import DisplayTileGallery from "../../_generic/parts/DisplayTileGallery.tsx";
import React from "react";
import parser from "html-react-parser";
import {Sheet} from "@mui/joy";

type ArticleDetailsCardProps = {
    article:Article;
};

export default function ArticleCard(props:Readonly<ArticleDetailsCardProps>):React.ReactElement {

    return (
        <Sheet className={"articleCard"}>
            <Sheet sx={{height: "100%"}} className={"richTextEditor"}>{parser(props.article.content)}</Sheet>
            {props.article.npcIds.length > 0 &&
                <DisplayTileGallery
                    urlPrefix={"/npc/"}
                    tileData={props.article.npcIds.map((npcId: string) => ({
                        id: npcId,
                        name: "Jürgen"
                    }))}
                    addNewName={"Neuer Nsc"}
                    addNewUrl={"/npc/new"}
                    tileSize={100}
                />}
        </Sheet>
    )
}
