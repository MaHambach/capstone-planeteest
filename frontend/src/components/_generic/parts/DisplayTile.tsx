import "./DisplayTile.css";
import React from "react";
import {useNavigate} from "react-router-dom";
import {BsFillGearFill} from "react-icons/bs";
import {Button} from "@mui/joy";

type DisplayTileProps = {
    name: string;
    image?: string;
    backgroundColor?: string;
    url: string;
    tileSize:number;
    updateUrl?: string;
}
export default function DisplayTile(props:Readonly<DisplayTileProps>):React.ReactElement{
    const [isHovered, setIsHovered] = React.useState(false);
    function handleMouseOver(event:React.MouseEvent<HTMLButtonElement> | React.FocusEvent<HTMLButtonElement>):void {
        event.preventDefault();
        setIsHovered(true)
    }

    function handleMouseOut(event:React.MouseEvent<HTMLButtonElement> | React.FocusEvent<HTMLButtonElement>):void {
        event.preventDefault();
        setIsHovered(false)
    }

    const navigate = useNavigate();

    const displayTileStyle = {
        width: props.tileSize,
        height: props.tileSize,
        backgroundColor: "white"
    }

    if(props.backgroundColor){
        displayTileStyle.backgroundColor = props.backgroundColor;
    }


    const propertiesButtonStyle = {
        top: 10,
        right: 10,
    }

    return (
        <div className={"displayTile"}
        >
            <Button
                className={isHovered ? "displayTileButton_hover" : "displayTileButton"}
                onClick={() => navigate(props.url)}
                style={displayTileStyle}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                onFocus={handleMouseOver}
                onBlur={handleMouseOut}
            >
                <b className={"name"}>{props.name}</b>
                {props.image && <img className={"characterCard_Image"} src={props.image} alt={""}/>}
            </Button>
            {(isHovered && props.updateUrl) &&
                <Button className={"propertiesButton"}
                        style={propertiesButtonStyle}
                        onClick={() => {if(props.updateUrl) navigate(props.updateUrl)}}
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                        onFocus={handleMouseOver}
                        onBlur={handleMouseOut}
                        color="neutral"
                >
                    <BsFillGearFill />
                </Button>
            }
        </div>
    )
}
