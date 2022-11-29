import React from 'react';
import {Grid, Typography} from "@mui/material";

import {TaskList} from "./components/TaskList";
import {Calendar} from "./components/Calendar";

const topGrid = {
    marginTop: '100px',
    maxWidth: '1200px',
    margin: 'auto',
    flexWrap: 'nowrap'
}

export const ToDoList = () => {

    return(
        <>
            <Typography variant="h3" textAlign="center">TodoList</Typography>
            <Grid container spacing={2} sx={topGrid}>
                <Calendar/>
                <TaskList/>
            </Grid>
        </>
    )

}