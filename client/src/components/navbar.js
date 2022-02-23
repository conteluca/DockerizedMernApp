import React from "react";
import {AppBar, Button, CssBaseline, IconButton, Slide, Toolbar, Typography, useScrollTrigger} from "@mui/material";
import {MenuSharp} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

export default function Navbar(props) {
    const navigate = useNavigate();
    const goOnCreatePage = () => navigate('/create');
    const goBack = () => navigate('/');
    return (
        <React.Fragment>
            <CssBaseline/>
            <HideOnScroll {...props}>
                <AppBar>
                    <Toolbar>
                        <IconButton size={"large"} edge={"start"} color={"inherit"} aria-label={"menu"} sx={{mr: 2}}>
                            <MenuSharp/>
                        </IconButton>
                        <Typography variant={'h6'} component={'div'} sx={{flexGrow: 1}}>
                            Home
                        </Typography>
                        <Button color={"inherit"} onClick={goOnCreatePage}>New Record</Button>
                        <Button color={"inherit"} onClick={goBack}>Back</Button>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Toolbar/>
        </React.Fragment>
    );
}
function ElevationScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}
function HideOnScroll(props) {
    const {children, window} = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}