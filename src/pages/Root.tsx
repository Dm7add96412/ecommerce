import { AppBar, Badge, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import { Link, Outlet, NavLink, useLocation } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LoginIcon from '@mui/icons-material/Login'
import { useEffect, useState } from 'react'

import Search from '../components/Search'
import useAppSelector from '../hooks/useAppSelector'
import { useFetchUserQuery } from '../redux/api/userApi'

const Root = () => {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
    const [token, setToken] = useState<string>('')
    const [userId, setUserId] = useState<string>('')
    const { token: authToken, userId: authUserId } = useAppSelector(state => state.authReducer)
    const location = useLocation()

    const { data, isError, isFetching } = useFetchUserQuery(
        { id: userId, token: token },
        { skip: !authUserId || !authToken }
    )
    
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    const cartQuantity = () => {
        if (!authToken && isError && !isFetching) {
            console.log('could not fetch user data')
        }
        if (authToken && data?.cart && data?.cart.length > 0) {
            return data?.cart.map(item => item.quantity).reduce((a, b) => a + b)
        }
    }

    useEffect(() => {
        if (authToken && authUserId) {
            setToken(authToken)
            setUserId(authUserId)
        }
    }, [authToken, authUserId])

    return (
        <Box sx={{ flexGrow: 1}} justifyItems='center'>
            <AppBar position='static'>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
                            <IconButton  color='inherit' component={Link} to='/' >
                                <HomeIcon/>
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
                                            component={NavLink} to='/products'>
                                            Products
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Typography sx={{ textAlign: 'center', textDecoration: 'none', color: 'inherit' }}
                                            component={NavLink} to='/categories'>
                                            Categories
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Typography sx={{ textAlign: 'center', textDecoration: 'none', color: 'inherit' }}
                                            component={NavLink} to={authToken ? '/shoppingcart' : '/login'}>
                                            Cart
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        {authToken ? 
                                            <Typography sx={{ textAlign: 'center', textDecoration: 'none', color: 'inherit' }}
                                            component={NavLink} to='/profilepage'>
                                            Profile
                                            </Typography> :
                                            <Typography sx={{ textAlign: 'center', textDecoration: 'none', color: 'inherit' }}
                                            component={NavLink} to='/login'>
                                            Login
                                            </Typography>}

                                    </MenuItem>
                            </Menu>
                        </Box>

                    </Box>
                    <Box sx={{ flex: 1, display: { xs: 'none', md: 'flex'}, justifyContent: 'center', gap: 4, textAlign: 'center' }}>
                        <Button color='inherit'
                                component={NavLink}
                                to='/'
                                sx={{ boxShadow: location.pathname === '/' ? '0 2px 8px rgba(0,0,0,0.25)' : 'none',
                                    opacity: location.pathname === '/' ? 1 : 0.8
                                 }}>
                                    Homepage
                                </Button>
                        <Button color='inherit'
                                component={NavLink}
                                to='/products'
                                sx={{ boxShadow: location.pathname === '/products' ? '0 2px 8px rgba(0,0,0,0.25)' : 'none',
                                    opacity: location.pathname === '/products' ? 1 : 0.8
                                 }}>
                                    Products
                                </Button>
                        <Button color='inherit'
                                component={NavLink}
                                to='/categories'
                                sx={{ boxShadow: location.pathname === '/categories' ? '0 2px 8px rgba(0,0,0,0.25)' : 'none',
                                    opacity: location.pathname === '/categories' ? 1 : 0.8
                                 }}>
                                    Categories
                                </Button>
                        <Badge badgeContent={cartQuantity()} color='error'>
                        <IconButton color='inherit'
                                    component={NavLink}
                                    to={authToken ? '/shoppingcart' : '/login'}
                                    sx={{ boxShadow: location.pathname === '/shoppingcart' ? '0 2px 8px rgba(0,0,0,0.25)' : 'none',
                                        opacity: location.pathname === '/shoppingcart' ? 1 : 0.8
                                     }}>
                            <ShoppingCartIcon/>
                        </IconButton>
                        </Badge>  
                    </Box>
                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                        <Search/>
                        {authToken ?
                            <IconButton color='inherit'
                                component={NavLink} to='/profilepage'
                                sx={{ boxShadow: location.pathname === '/profilepage' ? '0 2px 8px rgba(0,0,0,0.25)' : 'none',
                                    opacity: location.pathname === '/profilepage' ? 1 : 0.8
                                 }}>
                                <AccountCircleIcon/>
                            </IconButton> :
                            <IconButton color='inherit'
                                component={NavLink} to='/login'
                                sx={{ boxShadow: location.pathname === '/login' ? '0 2px 8px rgba(0,0,0,0.25)' : 'none',
                                    opacity: location.pathname === '/login' ? 1 : 0.8
                                 }}>
                                <LoginIcon/>
                            </IconButton>}
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