import {Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import React, {ChangeEvent, Dispatch, SetStateAction} from "react";
import {IMarker} from "../../hooks/calendarEffect";

const addTaskContainerSX = {
    display: 'flex',
    margin: 'auto',
    width: '80%',
}

const addTaskInputSX = {
    width: '100%',
    marginRight: '20px'
}

type Props = {
    lastMarkerID: number,
    setLastMarkerID: Dispatch<SetStateAction<number>>,
    stateMarkerArray: IMarker[],
    setTextValue: Dispatch<SetStateAction<string>>,
    textValue: string,
    stateEditTask: boolean,
    handleSubmit: () => void,
    handleSubmitMarker: () => void
}

export function BoxAddTask(props: Props){

    const handleChangeSelect = (event: SelectChangeEvent<number>): void => {
        props.setLastMarkerID(event.target.value as number);
    };

    const handleChangeText = (event: ChangeEvent<HTMLInputElement>): void => {
        props.setTextValue(event.currentTarget.value)
    }

    return (
        <Box sx={addTaskContainerSX}>
            <FormControl fullWidth style={{display: "flex", flex: '0 2 auto'}}>
                <InputLabel id="demo-simple-select-label">Тип</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={props.lastMarkerID}
                    label="Тип"
                    onChange={handleChangeSelect}
                    sx={{'#demo-simple-select':{display: "flex"}}}
                >
                    {props.stateMarkerArray.map((marker) => (
                        <MenuItem key={marker.id} sx={{display: "flex", alignItems: "center"}} value={marker.id}><BookmarkIcon key={marker.id} sx={{color: marker.colorTask}}/>{marker.typeTask}</MenuItem>
                    ))
                    }
                </Select>
            </FormControl>
            <TextField
                placeholder="Enter task..."
                sx={addTaskInputSX} type="text"
                value={props.textValue}
                onChange={handleChangeText}
            />
            <Button
                variant="contained"
                color={props.stateEditTask ? "warning" : "success"}
                onClick={() => props.handleSubmit()}>{props.stateEditTask ? "Save" : "Add"}
            </Button>
            <Button
                variant="contained"
                color={"primary"}
                onClick={() => props.handleSubmitMarker()}>Add marker
            </Button>
        </Box>
    )
}