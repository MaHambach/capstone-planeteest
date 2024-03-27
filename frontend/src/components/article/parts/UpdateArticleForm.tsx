import "./UpdateArticleForm.css";
import {Article} from "../../../types/Article.ts";
import React, {useEffect, useState} from "react";

type UpdateArticleFormProps = {
    article:Article;
    updateArticle: (article:Article) => void;
    setIsBeingEdited: (isBeingEdited:boolean) => void;
    setArticle: (article:Article) => void;
}

export default function UpdateArticleForm(props:Readonly<UpdateArticleFormProps>):React.ReactElement {
    const [formData, setFormData] = useState<Article>(props.article);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>):void {
        event.preventDefault();
        props.updateArticle(formData);
        props.setArticle(formData);
        props.setIsBeingEdited(false);
    }

    function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>):void {
        setFormData(
            {
                ...formData,
                content: event.target.value
            }
        )
    }

    function cancelUpdate():void {
        props.setIsBeingEdited(false);
    }

    useEffect(():void => {
        setFormData(props.article);
    }, [props]);

    return (
        <form className={"updateArticleForm"} onSubmit={handleSubmit}>
            <textarea
                className={"contentInput"}
                value={formData.content}
                onChange={handleChange}
            />
            <div className={"buttons"}>
                <button className={"saveButton"} type={"submit"}>Speichern</button>
                <button className={"cancelButton"} onClick={cancelUpdate}>Abbrechen</button>
            </div>
        </form>
    )
}