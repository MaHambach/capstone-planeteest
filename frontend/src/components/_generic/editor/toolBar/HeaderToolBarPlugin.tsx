import {IconButton, Select} from "@mui/joy";
import React from "react";
import {FaParagraph} from "react-icons/fa";
import {Editor} from "@tiptap/react";


type HeaderToolBarPluginProps = {
    editor: Editor | null;
}
export default function HeaderToolBarPlugin({editor}:Readonly<HeaderToolBarPluginProps>):React.ReactElement {

    if (!editor) {
        return <h2>Loading...</h2>
    }

    return (
        <Select>
            <IconButton
                className={editor.isActive('paragraph') ? 'editorToolBarButton is-active' : 'editorToolBarButton'}
                onClick={(event:React.MouseEvent) => {
                    event.preventDefault();
                    editor.chain().focus().setParagraph().run();
                }}
            >
                <FaParagraph />
            </IconButton>
            <IconButton
                className={editor.isActive('heading', { level: 1 }) ? 'editorToolBarButton is-active' : 'editorToolBarButton'}
                onClick={(event:React.MouseEvent) => {
                    event.preventDefault();
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                }}
            >
                H1
            </IconButton>
            <IconButton
                className={editor.isActive('heading', { level: 2 }) ? 'editorToolBarButton is-active' : 'editorToolBarButton'}
                onClick={(event:React.MouseEvent) => {
                    event.preventDefault();
                    editor.chain().focus().toggleHeading({ level: 2 }).run()}}
            >
                H2
            </IconButton>
            <IconButton
                className={editor.isActive('heading', { level: 3 }) ? 'editorToolBarButton is-active' : 'editorToolBarButton'}
                onClick={(event:React.MouseEvent) => {
                    event.preventDefault();
                    editor.chain().focus().toggleHeading({ level: 3 }).run()}}
            >
                H3
            </IconButton>
            <IconButton
                className={editor.isActive('heading', { level: 4 }) ? 'editorToolBarButton is-active' : 'editorToolBarButton'}
                onClick={(event:React.MouseEvent) => {
                    event.preventDefault();
                    editor.chain().focus().toggleHeading({ level: 4 }).run()}}
            >
               H4
            </IconButton>
        </Select>
    )
}
