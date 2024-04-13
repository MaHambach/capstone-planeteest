import './EditorToolBar.css';
import {Editor} from "@tiptap/react";
import React from "react";
import {
    FaCode, FaEraser,
    FaListOl,
    FaListUl,
    FaQuoteLeft,
    FaRulerHorizontal,
} from "react-icons/fa";
import FormatToolBarPlugin from "./FormatToolBarPlugin.tsx";
import UndoRedoToolbarPlugin from "./UndoRedoToolbarPlugin.tsx";
import {IconButton, Tooltip} from "@mui/joy";
import HeaderToolBarPlugin from "./HeaderToolBarPlugin.tsx";


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
            <Tooltip title={"Code"} placement={"bottom"} arrow>
                <IconButton
                    className={(editor.isActive('code') ? 'editorToolBarButton is-active' : 'editorToolBarButton')}
                    onClick={(event:React.MouseEvent) => {
                        event.preventDefault();
                        editor.chain().focus().toggleCode().run()
                    }}
                    disabled={!editor.can().chain().focus().toggleCode().run()}
                >
                    <FaCode />
                </IconButton>
            </Tooltip>
            <Tooltip title={"Formatierung entfernen"} placement={"bottom"} arrow>
                <IconButton
                    className={"editorToolBarButton"}
                    onClick={(event:React.MouseEvent) => {
                        event.preventDefault();
                        editor.chain().focus().unsetAllMarks().run()
                        editor.chain().focus().clearNodes().run()
                }}>
                    <FaEraser />
                </IconButton>
            </Tooltip>
            <HeaderToolBarPlugin editor={editor} />
            <Tooltip title={"Aufzählungszeichen"} placement={"bottom"} arrow>
                <IconButton
                    className={editor.isActive('bulletList') ? 'editorToolBarButton is-active' : 'editorToolBarButton'}
                    onClick={(event:React.MouseEvent) => {
                        event.preventDefault();
                        editor.chain().focus().toggleBulletList().run()}}
                >
                    <FaListUl />
                </IconButton>
            </Tooltip>
            <Tooltip title={"Nummerierung"} placement={"bottom"} arrow>
                <IconButton
                    className={editor.isActive("orderedList") ? "editorToolBarButton is-active" : "editorToolBarButton"}
                    onClick={(event:React.MouseEvent) => {
                        event.preventDefault();
                        editor.chain().focus().toggleOrderedList().run()}}
                >
                    <FaListOl />
                </IconButton>
            </Tooltip>
            <Tooltip title={"Blockcode"} placement={"bottom"} arrow>
                <IconButton
                    className={editor.isActive('codeBlock') ? "editorToolBarButton is-active" : "editorToolBarButton"}
                    onClick={(event:React.MouseEvent) => {
                        event.preventDefault();
                        editor.chain().focus().toggleCodeBlock().run()}}
                >
                    <FaCode />
                </IconButton>
            </Tooltip>
            <Tooltip title={"Blockzitat"} placement={"bottom"} arrow>
                <IconButton
                    className={editor.isActive('blockquote') ? 'editorToolBarButton is-active' : 'editorToolBarButton'}
                    onClick={(event:React.MouseEvent) => {
                        event.preventDefault();
                        editor.chain().focus().toggleBlockquote().run()
                    }}
                >
                    <FaQuoteLeft />
                </IconButton>
            </Tooltip>
            <Tooltip title={"Horizontale Linie"} placement={"bottom"} arrow>
                <IconButton
                    className={"editorToolBarButton"}
                    onClick={(event:React.MouseEvent) => {
                        event.preventDefault();
                        editor.chain().focus().setHorizontalRule().run();
                }}>
                    <FaRulerHorizontal />
                </IconButton>
            </Tooltip>
        </div>
    )
}
