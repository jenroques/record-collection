import React from "react";
import { Link } from "react-router-dom";

import { AppBar, Box, Button, Container, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Logo from '../Assets/logo.png';
import MenuIcon from '@mui/icons-material/Menu';
import { connect, useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';

import { logout, setIsCreated } from "../Action/actions"


const Nav = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const currentUser = useSelector((state) => state.session.currentUser);
    const dispatch = useDispatch();
    const history = useHistory();


    const handleLogout = () => {
        console.log("Trying to logout")
        dispatch(logout())
            .then(() => {
                dispatch(setIsCreated(false))
                history.push('/login');
            });
    }

    const pages = [
        { name: "Records", path: "/records" },
        { name: "Collections", path: "/collections" },
        { name: "Artist Database", path: "/artists" },
    ];

    const settings = [
        { name: "Profile", path: "/me" },
        { name: "Logout", path: "/login", onClick: handleLogout }
    ];


    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };


    return (
        <AppBar position="static" sx={{ backgroundColor: '#f6f8f9' }}>
            <Container maxWidth="xxl">
                <Toolbar disableGutters>
                    <Link to="/welcome" sx={{
                        position: 'fixed',
                        top: '20px',
                        left: '20px',
                        zIndex: 9999,
                    }}>
                        <img src={Logo} alt="Logo" width="125" height="100" style={{ position: 'sticky', top: '20px', left: '-30rem' }} />
                    </Link>
                    <Box sx={{
                        position: 'sticky',
                        display: { xs: 'none', md: 'flex' },
                        top: '20px',
                        left: '60px',
                        right: '20px',

                    }}>
                        {pages.map((page) => (
                            <Button
                                key={page.name}
                                onClick={handleCloseNavMenu}
                                size="large"
                                sx={{ my: 2, color: 'black', display: 'sticky' }}
                                component={Link}
                                to={page.path}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} style={{ position: 'sticky', marginLeft: '55rem' }}>
                                <MenuIcon fontSize="large" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem
                                    key={setting.name}
                                    onClick={
                                        setting.name === 'Logout'
                                            ? () => {
                                                handleCloseUserMenu();
                                                handleLogout();
                                            }
                                            : handleCloseUserMenu
                                    }
                                    component={Link}
                                    to={setting.path}
                                >
                                    <Typography sx={{ color: '#000000', fontWeight: 'bold' }} textAlign="center">
                                        {setting.name}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

const mapStateToProps = (state) => ({
    isCreated: state.user.isCreated,
})

const mapDispatchToProps = (dispatch) => ({
    setIsCreated: () => dispatch(setIsCreated())
});

export default connect(mapStateToProps, mapDispatchToProps)(Nav);


