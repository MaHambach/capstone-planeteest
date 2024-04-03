import './RichTextEditor.css'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorProvider } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'
import EditorToolBar from "./toolBar/EditorToolBar.tsx";



const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] }),
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
]

const content = ''

export default function RichTextEditor():React.ReactElement{
    return (
        <EditorProvider
            slotBefore={<EditorToolBar />}
            extensions={extensions}
            content={content}></EditorProvider>
    )
}
