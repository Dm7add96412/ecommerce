import { Box, Collapse, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import useAuthenticate from "../hooks/useAuthenticate"
import { useFetchUserQuery } from "../redux/api/userApi"
import OrderHistoryItem, { OrderHistoryCartItem } from "../types/OrderHistory"
import { Fragment, useEffect, useState } from "react"
import { isApiError } from "../utils/apiError"
import useAppDispatch from "../hooks/useAppDispatch"
import { useNavigate } from "react-router-dom"
import { logoutAuth } from "../redux/reducers/authReducer"
import AlertSnackBar from "../components/AlertSnackBar"
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material"

const OrderHistoryPage = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [errorMessage, setErrorMessage] = useState<string>('')
    const { token, userId, logOut } = useAuthenticate()
    const { data, isError, isFetching, error } = useFetchUserQuery({ id: userId, token: token })

    const cartTotal = (cart: OrderHistoryCartItem[]) => {
        return cart.map(item => item.price * item.quantity).reduce((a, b) => a + b)
    }

    useEffect(() => {
        if(!isFetching && (isError || !data)) {
            if (isApiError(error)) {
                setErrorMessage(error.data.error)
            } else {
                setErrorMessage('Error fetching user data / timeout')
            }
            setTimeout(() => {
                dispatch(logoutAuth())
                logOut()
                navigate('/login')
            }, 3000)
        }
    }, [isError, data, isFetching, navigate, dispatch, error, logOut])

    function Row(props: {row: OrderHistoryItem}) {
        const { row } = props
        const [open, setOpen] = useState<boolean>(false)
        return (
            <Fragment>
                <TableRow 
                    sx={{ '&:hover': { cursor: 'pointer' },
                        display: 'flex', 
                        flexDirection: 'row',
                        justifyContent: 'center',
                        pb: 0  }}>
                    <TableCell 
                        sx={{ border: 'unset', 
                            pb: 2,
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center' }}
                        onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUp/> : <KeyboardArrowDown/>}
                        {row.date}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <Collapse in={open} unmountOnExit>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left"><b>Title</b></TableCell>
                                    <TableCell align="right"><b>Quantity</b></TableCell>
                                    <TableCell align="right"><b>Unit price</b></TableCell>
                                    <TableCell align="right"><b>Total price</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {row.cart.map((item) => (
                                    <TableRow key={item.title + item.price}>
                                        <TableCell align="left">{item.title}</TableCell>
                                        <TableCell align="right">{item.quantity}</TableCell>
                                        <TableCell align="right">{item.price} €</TableCell>
                                        <TableCell align="right">{item.price * item.quantity} €</TableCell>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell align="right">
                                        <b>TOTAL: {cartTotal(row.cart)} €</b>   
                                    </TableCell>
                                    
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Collapse>
                </TableRow>
            </Fragment>
        )
    }
    
    return (
        <Box sx={{ display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 1,
            textAlign: 'center',
            width: { xs: 400, md: 750 }}}>
            <Typography variant='h5' sx={{ padding: 2 }}>
                ORDER HISTORY
            </Typography>
            {errorMessage && <AlertSnackBar 
                    message={errorMessage}
                    severity="error"/>}
            {!data?.orderHistory || data?.orderHistory?.length < 1
            && <Typography variant="body1">No previous orders</Typography>}
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableBody>
                        {data?.orderHistory?.map(item => (
                            <Row row={item} key={item.date}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default OrderHistoryPage