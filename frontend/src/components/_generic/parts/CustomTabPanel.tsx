import React from "react";
import {Box, Paper} from "@mui/material";


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
export default function CustomTabPanel(props: Readonly<TabPanelProps>):React.ReactElement {
    const { children, value, index, ...other } = props;

    return (
        <Paper
            className={"customTabPanel"}
            sx={{height: "calc(100% - 48px)"}}
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 0, height: "100%"}}>
                    {children}
                </Box>
            )}
        </Paper>
    );
}
