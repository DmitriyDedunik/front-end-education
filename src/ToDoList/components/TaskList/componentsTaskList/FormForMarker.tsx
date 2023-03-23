import {
    Box,
    Button,
    Modal,
    TextField
} from "@mui/material";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { IMarker } from "../../hooks/calendarEffect";
import BookmarkIcon from "@mui/icons-material/Bookmark";

const addTaskContainerSX = {
    display: 'flex',
    margin: 'auto',
    width: '80%',
    marginLeft: '5px',
}

const addTaskInputSX = {
    width: '100%',
    marginRight: '20px'
}

const modal = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '600px',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    height: '60%',
}

const buttonTask = {
    margin: '5px'
}

const boxMarker = {
    display: "flex",
    justifyContent: 'space-between',
    border: '2px solid #000',
    marginTop: '5px',
    alignItems: 'center',
}

type Props = {
    setOpenModal: Dispatch<SetStateAction<boolean>>,
    openModal: boolean,
    lastMarkerID: number,
    stateMarkerArray: IMarker[],
    setstateMarkerArray: Dispatch<SetStateAction<IMarker[]>>,
    setLastMarkerID: Dispatch<SetStateAction<number>>,
}

export function FormForMarker(props: Props) {

    const [color, setColor] = useState("#aabbcc");
    const [currentMarkerText, setCurrentMarkerText] = useState<string>('')
    const [stateEditMarker, setStateEditMarker] = useState<boolean>(false)
    const [currentMarkerId, setCurrentMarkerId] = useState<number>(0)

    const SubmitMarker = () => {
        props.setOpenModal(prev => !prev)
        setColor(props.stateMarkerArray[props.lastMarkerID].colorTask)
    }

    const saveFormForMarker = () => {
        if (stateEditMarker) {
            const newMarkerArr = props.stateMarkerArray.map((el) => {
                return el.id === currentMarkerId ? {
                    ...el,
                    colorTask: color,
                    typeTask: currentMarkerText,
                } : el;
            })
            setStateEditMarker(false)
            setCurrentMarkerText('')
            props.setstateMarkerArray(newMarkerArr)
        }
        else {
            props.stateMarkerArray.push({
                id: props.stateMarkerArray[props.stateMarkerArray.length - 1].id + 1,
                typeTask: currentMarkerText,
                colorTask: color
            })
            props.setstateMarkerArray([...props.stateMarkerArray])
            setCurrentMarkerText('')
        }
    }

    const ChangeMarkerText = (event: ChangeEvent<HTMLInputElement>): void => {
        setCurrentMarkerText(event.currentTarget.value)
    }

    const editMarker = (id: number): void => {
        setCurrentMarkerId(id)
        setCurrentMarkerText(props.stateMarkerArray[id].typeTask)
        setColor(props.stateMarkerArray[id].colorTask)
        setStateEditMarker(true)
    };

    const deleteMarker = (id: number): void => {
        const MarkerArray = [...props.stateMarkerArray].filter(el => el.id !== id) //копировать(деструктуризация) массив
        props.setstateMarkerArray([...MarkerArray])
    }

    return (
        <Modal
            keepMounted
            open={props.openModal}
            onClose={SubmitMarker}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
        >
            <Box sx={modal}>
                <Box sx={{ display: "flex" }}>
                    <HexColorPicker style={{height: '25vh', width: '20vw'}} color={color} onChange={setColor} />
                    <Box sx={addTaskContainerSX}>
                        <TextField
                            placeholder="Enter task..."
                            type="text"
                            sx={addTaskInputSX}
                            value={currentMarkerText}
                            onChange={ChangeMarkerText}
                        />
                        <Button
                            variant="contained"
                            color={stateEditMarker ? "warning" : "success"}
                            onClick={() => saveFormForMarker()}>{stateEditMarker ? "Save" : "Add"}
                        </Button>
                    </Box>
                </Box>
                <Box sx={{ overflowY: 'scroll', height: '55%', marginTop: '5px' }}>
                    {props.stateMarkerArray.map((marker) => (
                        <Box sx={boxMarker} key={marker.id}>
                            <BookmarkIcon key={marker.id} sx={{ color: marker.colorTask, marginRight: '20px' }} />
                            <Box style={{ flex: '1 1 auto' }}>{marker.typeTask}</Box>
                            <Box>
                                <Button variant="contained" sx={buttonTask} color="warning"
                                    onClick={() => editMarker(marker.id)}>Edit</Button>
                                <Button variant="contained" sx={buttonTask} color="error"
                                    onClick={() => deleteMarker(marker.id)}>Delete</Button>
                            </Box>
                        </Box>
                    ))
                    }
                </Box>
            </Box>
        </Modal>
    )
}