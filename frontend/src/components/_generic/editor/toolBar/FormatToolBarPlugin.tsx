import React from "react";
import {FaBold, FaItalic, FaStrikethrough, FaUnderline} from "react-icons/fa";
import {Editor} from "@tiptap/react";

type FormatPluginProps = {
    editor: Editor | null;
}

export default function FormatToolBarPlugin({editor}:Readonly<FormatPluginProps>):React.ReactElement {

    if (!editor) {
        return <h2>Loading...</h2>
    }

    return (
        <>
            <button
                onClick={(event: React.MouseEvent) => {
                    event.preventDefault();
                    editor.chain().focus().toggleBold().run();
                }}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleBold()
                        .run()
                }
                className={editor.isActive('bold') ? 'editorToolBarButton is-active' : 'editorToolBarButton'}
            >
                <FaBold/>
            </button>
            <button
                onClick={(event: React.MouseEvent) => {
                    event.preventDefault();
                    editor.chain().focus().toggleItalic().run();
                }}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleItalic()
                        .run()
                }
                className={editor.isActive('italic') ? 'editorToolBarButton is-active' : 'editorToolBarButton'}
            >
                <FaItalic/>
            </button>
            <button
                onClick={(event: React.MouseEvent) => {
                    event.preventDefault();
                    editor.chain().focus().toggleUnderline().run();
                }}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleUnderline()
                        .run()
                }
                className={editor.isActive('underline') ? 'editorToolBarButton is-active' : 'editorToolBarButton'}
            >
                <FaUnderline/>
            </button>
            <button
                onClick={(event: React.MouseEvent) => {
                    event.preventDefault();
                    editor.chain().focus().toggleStrike().run()
                }}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleStrike()
                        .run()
                }
                className={editor.isActive('strike') ? 'editorToolBarButton is-active' : 'editorToolBarButton'}
            >
                <FaStrikethrough/>
            </button>
        </>
    )
}
