import './ArticleWindow.css';
import React, {useEffect, useState} from "react";
import DraggableSubWindow from "../../_generic/draggable/DraggableSubWindow.tsx";
import UpdateArticleForm from "./UpdateArticleForm.tsx";
import {Article, emptyArticle} from "../../../types/Article.ts";
import ArticleCard from "./ArticleCard.tsx";
import {Box, Button, Tab, Tabs} from "@mui/material";
import CustomTabPanel from "../../_generic/parts/CustomTabPanel.tsx";

type Props = {
    coordinates: {x:number, y:number};
    gmArticle:Article;
    playerArticle:Article;
    title:string;
    isOwner:boolean;
}
type Functions = {
    updateArticle: (article:Article) => void;
    closeWindow: () => void;
}
type ArticleWindowProps = {
    props:Props;
    functions:Functions;
}
export default function ArticleWindow({props, functions}:Readonly<ArticleWindowProps>):React.ReactElement {
    const [gmArticle, setGmArticle] = useState<Article>(props.gmArticle);
    const [playerArticle, setPlayerArticle] = useState<Article>(props.playerArticle);
    const [value, setValue] = React.useState(0);
    const [isBeingEdited, setIsBeingEdited] = useState(false);
    const [formData, setFormData] = useState<Article>(emptyArticle);

    useEffect(():void => {
        setGmArticle(props.gmArticle);
        setPlayerArticle(props.playerArticle);
        setFormData(emptyArticle);
    }, [props]);

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    function a11yProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    function handleSubmit(event: React.MouseEvent):void {
        event.preventDefault();
        functions.updateArticle(formData);
        setIsBeingEdited(false);
    }

    function cancelUpdate():void {
        setIsBeingEdited(false);
        setFormData(emptyArticle);
    }

    function setFormContent(content:string):Article {
        formData.content = content;
        return formData;
    }

    return (
        <DraggableSubWindow
            functions={{closeFrame: functions.closeWindow}}
            props={{
                title: props.title,
                initialPosition: {
                    left: props.coordinates.x + 150,
                    top: props.coordinates.y +20,
                    width: 515,
                    height: 300
                }
        }}
        >
            <Box className={"tabBox"} sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={value} onChange={handleTabChange} aria-label="basic tabs example">
                    <Tab label="Spieler" {...a11yProps(0)} value={0}/>
                    {props.isOwner && <Tab label="GM" {...a11yProps(1)} value={1}/>}
                </Tabs>
                <div className={"buttonDiv"}>
                    {(props.isOwner && !isBeingEdited) &&
                        <Button onClick={(): void => setIsBeingEdited(!isBeingEdited)}>Bearbeiten</Button>}
                    {(props.isOwner && isBeingEdited) &&
                        <>
                            <Button onClick={handleSubmit}>Speichern</Button>
                            <Button className={"cancelButton"} onClick={cancelUpdate}>Abbrechen</Button>
                        </>
                    }
                </div>
            </Box>
            <CustomTabPanel value={value} index={0}>
                {isBeingEdited ?
                    <UpdateArticleForm
                        article={playerArticle}
                        setIsBeingEdited={setIsBeingEdited}
                        setFormData={setFormData}
                        setFormContent={setFormContent}
                    />
                    :
                    <ArticleCard article={playerArticle}/>
                }
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                { isBeingEdited ?
                    <UpdateArticleForm
                        article={gmArticle}
                        setIsBeingEdited={setIsBeingEdited}
                        setFormData={setFormData}
                        setFormContent={setFormContent}
                    />
                    :
                    <ArticleCard article={gmArticle}/>
                }
            </CustomTabPanel>
        </DraggableSubWindow>
    )
}
