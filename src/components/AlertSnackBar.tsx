import { useState } from "react"
import AlertSnackBarProps from "../types/AlertSnackBarProps"
import Snackbar from "@mui/material/Snackbar"
import { Alert } from "@mui/material"


const AlertSnackBar: React.FC<AlertSnackBarProps> = ({ severity, message }) => {
    const [open, setOpen] = useState<boolean>(true)

    const handleClose = (
/*         event?: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason, */
        ) => {
/*         if (reason === 'clickaway') {
            return;
        } */

        setOpen(false);
        }

    return (
        <Snackbar open={open} 
            onClose={handleClose}
            anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}>
            <Alert 
                onClose={handleClose}
                severity={severity}
                variant="filled">
                {message}
            </Alert>
        </Snackbar>
    )
}

export default AlertSnackBar