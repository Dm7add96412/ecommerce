import { Box, Typography } from "@mui/material"
import EuroIcon from '@mui/icons-material/Euro';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

const HomePage = () => {
    return (
        <Box sx={{ display: 'flex',
                flexDirection: 'column',
                textAlign: 'center',
                padding: 1,
                gap: 3,
                alignItems: 'center'
                }}>
            <Typography variant="h5">HOMEPAGE</Typography>
            <Typography> Welcome to this fancy E-commerce website! 
                Enjoy your fake shopping! :)
            </Typography>
            <Typography>Please login to use the shopping cart.</Typography>
            <Box sx={{ display: 'flex',
                    flexDirection: 'row',
                    gap: 4
             }}>
                <EuroIcon color='secondary'/>
                <LocalShippingIcon color='success'/>
                <CreditCardIcon color='info'/>
                <ShoppingBasketIcon color='warning'/>
            </Box>
        </Box>
    )
}

export default HomePage