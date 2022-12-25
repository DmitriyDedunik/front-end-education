import {Box, Button, Modal} from "@mui/material";
import React, {Dispatch, SetStateAction} from "react";

const modal = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type Props = {
    setOpenModal: Dispatch<SetStateAction<boolean>>,
    openModal: boolean
}

export function FormForMarker({setOpenModal, openModal} : Props){

    const handleSubmitMarker = () => {
        setOpenModal(prev => !prev)
    }

    return (
        <Modal
            sx = {modal}
            open={openModal}
            onClose={handleSubmitMarker}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box>
                <Button
                    variant="contained"
                    color={"primary"}
                    onClick={() => handleSubmitMarker()}>Add marker
                </Button>
            </Box>
        </Modal>
    )
}