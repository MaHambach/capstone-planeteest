import "./UpdateArticleForm.css";
import {Article} from "../../../types/Article.ts";
import React, {useEffect, useState} from "react";
import RichTextEditor from "../../_generic/editor/RichTextEditor.tsx";

type UpdateArticleFormProps = {
    article:Article;
    updateArticle: (article:Article) => void;
    setIsBeingEdited: (isBeingEdited:boolean) => void;
    setArticle: (article:Article) => void;
}

export default function UpdateArticleForm(props:Readonly<UpdateArticleFormProps>):React.ReactElement {
    const [formData, setFormData] = useState<Article>(props.article);

    function setContent(content:string):void {
        setFormData({...formData, content: content});
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>):void {
        event.preventDefault();
        props.updateArticle(formData);
        props.setArticle(formData);
        props.setIsBeingEdited(false);
    }

    function cancelUpdate():void {
        props.setIsBeingEdited(false);
    }

    useEffect(():void => {
        setFormData(props.article);
    }, [props]);

    return (
        <form className={"updateArticleForm"} onSubmit={handleSubmit}>
            <RichTextEditor content={props.article.content} setContent={setContent}/>
            <div className={"buttons"}>
                <button className={"saveButton"} type={"submit"}>Speichern</button>
                <button className={"cancelButton"} onClick={cancelUpdate}>Abbrechen</button>
            </div>
        </form>
    )
}
