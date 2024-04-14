import './RichTextEditor.css'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import {EditorContent, useEditor} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'
import EditorToolBar from "./toolBar/EditorToolBar.tsx";
import Underline from '@tiptap/extension-underline'
import {Paper} from "@mui/material";
import {FormControl} from "@mui/joy";



const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle,
    StarterKit.configure({
        bulletList: {
            keepMarks: true,
            keepAttributes: false,
        },
        orderedList: {
            keepMarks: true,
            keepAttributes: false,
        },
    }),
    Underline,
]


type RichTextEditorProps = {
    content: string;
    setContent: (content:string) => void;
}
export default function RichTextEditor(props:Readonly<RichTextEditorProps>):React.ReactElement{

    const editor = useEditor(
        {
            extensions: extensions,
            content: props.content,
            onUpdate: ({ editor }) => {
                const html = editor.getHTML();
                props.setContent(html);
            }
        }
    )

    return (
        <FormControl sx={{height: "100%"}} className={"textWindow"}>
            <EditorToolBar editor={editor}/>
            <Paper sx={{height: "calc(100% - 37px)"}} className={"richTextEditor"}>
                <EditorContent editor={editor} className={"editorContent"}/>
            </Paper>
        </FormControl>
    )
}
