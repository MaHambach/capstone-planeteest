import "./UpdateArticleForm.css";
import {Article} from "../../../types/Article.ts";
import React, {useEffect} from "react";
import RichTextEditor from "../../_generic/editor/RichTextEditor.tsx";

type UpdateArticleFormProps = {
    article:Article;
    setIsBeingEdited: (isBeingEdited:boolean) => void;
    setFormData: (article:Article) => void;
    setFormContent: (content:string) => Article;
}
export default function UpdateArticleForm(props:Readonly<UpdateArticleFormProps>):React.ReactElement {

    function setContent(content:string):void {
        props.setFormContent(content)
    }

    useEffect(():void => {
        props.setFormData(props.article);
    }, [props]);

    return (
        <form className={"updateArticleForm"}>
            <RichTextEditor content={props.article.content} setContent={setContent}/>
        </form>
    )
}
