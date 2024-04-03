import './EditorToolBar.css';
import {Editor} from "@tiptap/react";
import React from "react";
import {
    FaCode, FaEraser,
    FaListOl,
    FaListUl,
    FaParagraph,
    FaQuoteLeft,
    FaRulerHorizontal,
} from "react-icons/fa";
import FormatToolBarPlugin from "./FormatToolBarPlugin.tsx";
import UndoRedoToolbarPlugin from "./UndoRedoToolbarPlugin.tsx";


type EditorToolBarProps = {
    editor: Editor | null;
}
export default function EditorToolBar({editor}:Readonly<EditorToolBarProps>):React.ReactElement {

    if (!editor) {
        return <h2>Loading...</h2>
    }

    return (
        <div className={"editorToolBar"}>
            <UndoRedoToolbarPlugin editor={editor} />
            <FormatToolBarPlugin editor={editor}/>
            <button
                className={(editor.isActive('bold') ? 'editorToolBarButton is-active' : 'editorToolBarButton')}
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
            >
                <FaCode />
            </button>
            <button
                className={"editorToolBarButton"}
                onClick={(event:React.MouseEvent) => {
                event.preventDefault();
                editor.chain().focus().unsetAllMarks().run()
                editor.chain().focus().clearNodes().run()
            }}>
                <FaEraser />
            </button>
            <button
                className={editor.isActive('paragraph') ? 'editorToolBarButton is-active' : 'editorToolBarButton'}
                onClick={(event:React.MouseEvent) => {
                    event.preventDefault();
                    editor.chain().focus().setParagraph().run();
                }}
            >
                <FaParagraph />
            </button>
            <button
                className={editor.isActive('heading', { level: 1 }) ? 'editorToolBarButton is-active' : 'editorToolBarButton'}
                onClick={(event:React.MouseEvent) => {
                    event.preventDefault();
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                }}
            >
                h1
            </button>
            <button
                className={editor.isActive('heading', { level: 2 }) ? 'editorToolBarButton is-active' : 'editorToolBarButton'}
                onClick={(event:React.MouseEvent) => {
                    event.preventDefault();
                    editor.chain().focus().toggleHeading({ level: 2 }).run()}}
            >
                h2
            </button>
            <button
                className={editor.isActive('heading', { level: 3 }) ? 'editorToolBarButton is-active' : 'editorToolBarButton'}
                onClick={(event:React.MouseEvent) => {
                    event.preventDefault();
                    editor.chain().focus().toggleHeading({ level: 3 }).run()}}
            >
                h3
            </button>
            <button
                className={editor.isActive('heading', { level: 4 }) ? 'editorToolBarButton is-active' : 'editorToolBarButton'}
                onClick={(event:React.MouseEvent) => {
                    event.preventDefault();
                    editor.chain().focus().toggleHeading({ level: 4 }).run()}}
            >
                h4
            </button>
            <button
                className={editor.isActive('heading', { level: 5 }) ? 'editorToolBarButton is-active' : 'editorToolBarButton'}
                onClick={(event:React.MouseEvent) => {
                    event.preventDefault();
                    editor.chain().focus().toggleHeading({ level: 5 }).run()}}
            >
                h5
            </button>
            <button
                className={editor.isActive('heading', { level: 6 }) ? 'editorToolBarButton is-active' : 'editorToolBarButton'}
                onClick={(event:React.MouseEvent) => {
                    event.preventDefault();
                    editor.chain().focus().toggleHeading({ level: 6 }).run()}}
            >
                h6
            </button>
            <button
                className={editor.isActive('bulletList') ? 'editorToolBarButton is-active' : 'editorToolBarButton'}
                onClick={(event:React.MouseEvent) => {
                    event.preventDefault();
                    editor.chain().focus().toggleBulletList().run()}}
            >
                <FaListUl />
            </button>
            <button
                className={editor.isActive("orderedList") ? "editorToolBarButton is-active" : "editorToolBarButton"}
                onClick={(event:React.MouseEvent) => {
                    event.preventDefault();
                    editor.chain().focus().toggleOrderedList().run()}}
            >
                <FaListOl />
            </button>
            <button
                className={editor.isActive('codeBlock') ? "editorToolBarButton is-active" : "editorToolBarButton"}
                onClick={(event:React.MouseEvent) => {
                    event.preventDefault();
                    editor.chain().focus().toggleCodeBlock().run()}}
            >
                <FaCode />
            </button>
            <button
                className={editor.isActive('blockquote') ? 'editorToolBarButton is-active' : 'editorToolBarButton'}
                onClick={(event:React.MouseEvent) => {
                    event.preventDefault();
                    editor.chain().focus().toggleBlockquote().run()
                }}
            >
                <FaQuoteLeft />
            </button>
            <button
                className={"editorToolBarButton"}
                onClick={(event:React.MouseEvent) => {
                    event.preventDefault();
                    editor.chain().focus().setHorizontalRule().run()
            }}>
                <FaRulerHorizontal />
            </button>

        </div>
    )
}
