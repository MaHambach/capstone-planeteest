import {useCurrentEditor} from "@tiptap/react";
import React from "react";
import {
    FaCode,
    FaListOl,
    FaListUl, FaParagraph,
    FaQuoteLeft,
    FaRulerHorizontal,
} from "react-icons/fa";
import FormatPlugin from "./FormatPlugin.tsx";

export default function EditorToolBar():React.ReactElement {
    const { editor } = useCurrentEditor()

    if (!editor) {
        return <h2>Loading...</h2>
    }

    return (
        <div className={"editorToolBar"}>
            <FormatPlugin editor={editor} />
            <button
                onClick={(event:React.MouseEvent) => {
                    event.preventDefault();
                    editor.chain().focus().toggleCode().run()
                }}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleCode()
                        .run()
                }
                className={editor.isActive('code') ? 'is-active' : ''}
            >
                <FaCode />
            </button>
            <button onClick={(event:React.MouseEvent) => {
                event.preventDefault();
                editor.chain().focus().unsetAllMarks().run()
            }}>
                clear marks
            </button>
            <button onClick={(event:React.MouseEvent) => {
                event.preventDefault();
                editor.chain().focus().clearNodes().run()
            }}>
                clear nodes
            </button>
            <button
                onClick={(event:React.MouseEvent) => {
                    event.preventDefault();
                    editor.chain().focus().setParagraph().run();
                }}
                className={editor.isActive('paragraph') ? 'is-active' : ''}
            >
                <FaParagraph />
            </button>
            <button
                onClick={(event:React.MouseEvent) => {
                    event.preventDefault();
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                }}
                className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
            >
                h1
            </button>
            <button
                onClick={(event:React.MouseEvent) => {
                    event.preventDefault();
                    editor.chain().focus().toggleHeading({ level: 2 }).run()}}
                className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
            >
                h2
            </button>
            <button
                onClick={(event:React.MouseEvent) => {
                    event.preventDefault();
                    editor.chain().focus().toggleHeading({ level: 3 }).run()}}
                className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
            >
                h3
            </button>
            <button
                onClick={(event:React.MouseEvent) => {
                    event.preventDefault();
                    editor.chain().focus().toggleHeading({ level: 4 }).run()}}
                className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
            >
                h4
            </button>
            <button
                onClick={(event:React.MouseEvent) => {
                    event.preventDefault();
                    editor.chain().focus().toggleHeading({ level: 5 }).run()}}
                className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
            >
                h5
            </button>
            <button
                onClick={(event:React.MouseEvent) => {
                    event.preventDefault();
                    editor.chain().focus().toggleHeading({ level: 6 }).run()}}
                className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
            >
                h6
            </button>
            <button
                onClick={(event:React.MouseEvent) => {
                    event.preventDefault();
                    editor.chain().focus().toggleBulletList().run()}}
                className={editor.isActive('bulletList') ? 'is-active' : ''}
            >
                <FaListUl />
            </button>
            <button
                onClick={(event:React.MouseEvent) => {
                    event.preventDefault();
                    editor.chain().focus().toggleOrderedList().run()}}
                className={editor.isActive('orderedList') ? 'is-active' : ''}
            >
                <FaListOl />
            </button>
            <button
                onClick={(event:React.MouseEvent) => {
                    event.preventDefault();
                    editor.chain().focus().toggleCodeBlock().run()}}
                className={editor.isActive('codeBlock') ? 'is-active' : ''}
            >
                <FaCode />
            </button>
            <button
                onClick={(event:React.MouseEvent) => {
                    event.preventDefault();
                    editor.chain().focus().toggleBlockquote().run()
                }}
                className={editor.isActive('blockquote') ? 'is-active' : ''}
            >
                <FaQuoteLeft />
            </button>
            <button onClick={(event:React.MouseEvent) => {
                    event.preventDefault();
                    editor.chain().focus().setHorizontalRule().run()
            }}>
                <FaRulerHorizontal />
            </button>
            <button onClick={(event:React.MouseEvent) => {
                    event.preventDefault();
                    editor.chain().focus().setHardBreak().run()
            }}>
                hard break
            </button>
            <button
                onClick={(event:React.MouseEvent) => {
                    event.preventDefault();
                    editor.chain().focus().undo().run()
                }}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .undo()
                        .run()
                }
            >
                undo
            </button>
            <button
                onClick={(event:React.MouseEvent) => {
                    event.preventDefault();
                    editor.chain().focus().redo().run()
                }}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .redo()
                        .run()
                }
            >
                redo
            </button>
            <button
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                    event.preventDefault();
                    editor.chain().focus().setColor('#958DF1').run();
                }}
                className={editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active' : ''}
            >
                purple
            </button>
        </div>
    )
}
