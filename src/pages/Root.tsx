import { AppBar, Badge, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import { Link, Outlet } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useState } from 'react'

import Search from '../components/Search'
import useAppSelector from '../hooks/useAppSelector'

const Root = () => {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
    const cart = useAppSelector(state => state.cartReducer)
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    const cartQuantity = () => {
        if (cart && cart.length > 0) {
            return cart.map(item => item.quantity).reduce((a, b) => a + b)
        }
    }

    return (
        <Box sx={{ flexGrow: 1}} justifyItems='center'>
            <AppBar position='static'>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                        <IconButton  color="inherit" component={Link} to="/" size='large' >
                            <HomeIcon/>
                        </IconButton>
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton size='large'
                                color='inherit'
                                onClick={handleOpenNavMenu}>
                                <MenuIcon/>
                            </IconButton>
                            <Menu id='menu-appbar'
                                sx={{ display: {xs: 'block', md: 'none'}}}
                                keepMounted
                                anchorEl={anchorElNav}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}>
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Typography sx={{ textAlign: 'center', textDecoration: 'none', color: 'inherit' }}
                                            component={Link} to='/products'>
                                            Products
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Typography sx={{ textAlign: 'center', textDecoration: 'none', color: 'inherit' }}
                                            component={Link} to='/categories'>
                                            Categories
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Typography sx={{ textAlign: 'center', textDecoration: 'none', color: 'inherit'  }}
                                            component={Link} to='/shoppingcart'>
                                            Cart
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Typography sx={{ textAlign: 'center', textDecoration: 'none', color: 'inherit'  }}
                                            component={Link} to='/profilepage'>
                                            Profile
                                        </Typography>
                                    </MenuItem>
                            </Menu>
                        </Box>
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
                    <Box sx={{ flex: 1, display: { xs: 'none', md: 'flex'}, justifyContent: 'center', gap: 4, textAlign: 'center' }}>
                        <Button color='inherit' component={Link} to='/'>Homepage</Button>
                        <Button color='inherit' component={Link} to='/products'>Products</Button>
                        <Button color='inherit' component={Link} to='/categories'>Categories</Button>
                        <Badge badgeContent={cartQuantity()} color='error'>
                        <IconButton color='inherit' component={Link} to='/shoppingcart'>
                            <ShoppingCartIcon/>
                        </IconButton>
                        </Badge>  
                    </Box>
                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                        <Search/>
                        <IconButton color='inherit' component={Link} to='/profilepage'>
                            <AccountCircleIcon/>
                        </IconButton>
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