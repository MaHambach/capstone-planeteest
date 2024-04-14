import {Tooltip} from "@mui/joy";
import React, {useState} from "react";
import {FaParagraph} from "react-icons/fa";
import {Editor} from "@tiptap/react";
import {Button, ListItemIcon, Menu, MenuItem} from "@mui/material";
import {MdArrowDropDown} from "react-icons/md";

type HeaderToolBarPluginProps = {
    editor: Editor | null;
}
export default function HeaderToolBarPlugin({editor}:Readonly<HeaderToolBarPluginProps>):React.ReactElement {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    function handleClick(event:React.MouseEvent<HTMLButtonElement>):void {
        event.preventDefault();
        setAnchorEl(event.currentTarget);
    }

    function handleClose(event:React.MouseEvent):void {
        event.preventDefault();
        setAnchorEl(null);
    }

    if (!editor) {
        return <h2>Loading...</h2>
    }

    function handleChangeFormat(event:React.MouseEvent, format:string):void {
        if(!editor) return;
        event.preventDefault();
        switch(format) {
            case "paragraph":
                editor.chain().focus().setParagraph().run();
                break;
            case "heading1":
                editor.chain().focus().toggleHeading({level: 1}).run();
                break;
            case "heading2":
                editor.chain().focus().toggleHeading({ level: 2 }).run();
                break;
            case "heading3":
                editor.chain().focus().toggleHeading({ level: 3 }).run();
                break;
            case "heading4":
                editor.chain().focus().toggleHeading({ level: 4 }).run();
                break;
            default:
        }
        handleClose(event);
    }

    return (
        <>
            <Tooltip title={"Formatvorlagen"} placement={"bottom"} arrow>
                <Button
                    color='inherit'
                    id={"formatSelect-button"}
                    onClick={handleClick}
                    aria-controls={open ? "formatSelect" : undefined}
                    aria-haspopup={"true"}
                    aria-expanded={open ? "true" : undefined}
                    style={{maxWidth: "62px", minWidth: "62px"}}
                >
                    <FaParagraph />
                    <MdArrowDropDown />
                </Button>
            </Tooltip>
            <Menu
                id={"formatSelect-menu"}
                anchorEl={anchorEl}
                open={open}
                MenuListProps={{'aria-labelledby': 'formatSelect-button'}}
                onClose={handleClose}
                anchorOrigin={{vertical: 'bottom', horizontal: 'left',}}
                transformOrigin={{vertical: 'top', horizontal: 'left',}}
                disableScrollLock={true}
            >
                <MenuItem
                    className={editor.isActive('paragraph') ? 'editorToolBarButton is-active' : 'editorToolBarButton'}
                    onClick={(event: React.MouseEvent) => handleChangeFormat(event, "paragraph")}
                >
                    <ListItemIcon color={"error"}>
                        <FaParagraph />
                    </ListItemIcon>
                </MenuItem>
                <MenuItem
                    className={editor.isActive('heading', { level: 1 }) ? 'editorToolBarButton is-active' : 'editorToolBarButton'}
                    onClick={(event: React.MouseEvent) => handleChangeFormat(event, "heading1")}
                >
                    <ListItemIcon>
                        <div><b>H1</b></div>
                    </ListItemIcon>
                </MenuItem>
                <MenuItem
                    className={editor.isActive('heading', {level: 2}) ? 'editorToolBarButton is-active' : 'editorToolBarButton'}
                    onClick={(event: React.MouseEvent) => handleChangeFormat(event, "heading2")}
                >
                    <ListItemIcon>
                        <div><b>H2</b></div>
                    </ListItemIcon>
                </MenuItem>
                <MenuItem
                    className={editor.isActive('heading', {level: 3}) ? 'editorToolBarButton is-active' : 'editorToolBarButton'}
                    onClick={(event: React.MouseEvent) => handleChangeFormat(event, "heading3")}
                >
                    <ListItemIcon>
                        <div><b>H3</b></div>
                    </ListItemIcon>
                </MenuItem>
                <MenuItem
                    className={editor.isActive('heading', {level: 4}) ? 'editorToolBarButton is-active' : 'editorToolBarButton'}
                    onClick={(event: React.MouseEvent) => handleChangeFormat(event, "heading4")}
                >
                    <ListItemIcon>
                        <div><b>H4</b></div>
                    </ListItemIcon>
                </MenuItem>
            </Menu>
        </>
    )
}
