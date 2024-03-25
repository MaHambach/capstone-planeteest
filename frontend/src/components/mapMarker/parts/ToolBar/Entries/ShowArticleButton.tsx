import './ShowArticleButton.css';
import React from "react";
import {FiAlignCenter} from "react-icons/fi";

type ShowArticleButtonProps = {
    setShowArticle: (showArticle:boolean) => void;
}
export default function ShowArticleButton(props:Readonly<ShowArticleButtonProps>): React.ReactElement {
    function handleClick(event: React.MouseEvent<HTMLButtonElement>):void {
        event.preventDefault();
        props.setShowArticle(true);
    }

    return (
        <button className={"showArticleButton"}
                onClick={handleClick}>
            <FiAlignCenter/>
        </button>
    )
}