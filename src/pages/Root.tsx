import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import { Link, Outlet } from 'react-router-dom'

import Search from '../components/Search'

const Root = () => {
    return (
        <Box sx={{ flexGrow: 1}} justifyItems='center'>
            <AppBar position='static'>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                        <IconButton  color="inherit" component={Link} to="/" >
                            <HomeIcon />
                        </IconButton>
                        <Typography variant='h6'
                            noWrap
                            component='a'
                            sx={{
                                alignItems: 'center',
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'sans-serif',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                }}>
                            E-COMMERCE
                        </Typography>
                    </Box>
                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', gap: 4 }}>
                        <Button color='inherit' component={Link} to='/'>Homepage</Button>
                        <Button color='inherit' component={Link} to='/products'>Products</Button>
                        <Button color='inherit' component={Link} to='/shoppingcart'>Shopping cart</Button>
                        <Button color='inherit' component={Link} to='/profilepage'>Profile</Button>
                    </Box>
                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                        <Search/>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box sx={{ padding: 1, width: '75%', justifyItems: 'center' }}>
                <Outlet />
            </Box>   
        </Box>
    )
}

export default Root