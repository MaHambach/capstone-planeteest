import React from "react";
import {FaRedo, FaUndo} from "react-icons/fa";
import {Editor} from "@tiptap/react";
import {IconButton} from "@mui/material";
import {Tooltip} from "@mui/joy";

type UndoRedoToolbarPluginProps = {
    editor: Editor | null;
}

export default function UndoRedoToolbarPlugin({editor}:Readonly<UndoRedoToolbarPluginProps>):React.ReactElement {

    if (!editor) {
        return <h2>Loading...</h2>
    }

    return (
        <>
            <Tooltip title={"Rückgängig"} placement={"bottom"} arrow>
                <IconButton
                    size={"small"}
                    className={"editorToolBarButton"}
                    onClick={(event: React.MouseEvent) => {
                        event.preventDefault();
                        editor.chain().focus().undo().run();
                    }}
                    disabled={!editor.can().chain().focus().undo().run()}
                >
                    <FaUndo/>
                </IconButton>
            </Tooltip>
            <Tooltip title={"Wiederherstellen"} placement={"bottom"} arrow>
                <IconButton
                    size={"small"}
                    className={"editorToolBarButton"}
                    onClick={(event: React.MouseEvent) => {
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
                    <FaRedo/>
                </IconButton>
            </Tooltip>
        </>
    )
}
