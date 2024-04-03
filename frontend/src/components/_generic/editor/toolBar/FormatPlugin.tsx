import React from "react";
import {FaBold, FaItalic, FaStrikethrough, FaUnderline} from "react-icons/fa";
import {Editor} from "@tiptap/react";

type FormatPluginProps = {
    editor: Editor | null;
}
export default function FormatPlugin({editor}: Readonly<FormatPluginProps>):React.ReactElement {
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
                className={editor.isActive('bold') ? 'is-active' : ''}
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
                className={editor.isActive('italic') ? 'is-active' : ''}
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
                className={editor.isActive('italic') ? 'is-active' : ''}
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
                className={editor.isActive('strike') ? 'is-active' : ''}
            >
                <FaStrikethrough/>
            </button>
        </>
    )
}
