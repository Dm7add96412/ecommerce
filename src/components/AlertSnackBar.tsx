import { useState } from "react"
import AlertSnackBarProps from "../types/AlertSnackBarProps"
import Snackbar from "@mui/material/Snackbar"
import { Alert } from "@mui/material"


const AlertSnackBar: React.FC<AlertSnackBarProps> = ({ severity, message, hideduration, location }) => {
    const [open, setOpen] = useState<boolean>(true)

    const handleClose = (
        ) => {
        setOpen(false);
        }

    return (
        <Snackbar open={open} 
            onClose={handleClose}
            anchorOrigin={{ horizontal: 'center', vertical: location ? location : 'bottom' }}
            autoHideDuration={hideduration}>
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