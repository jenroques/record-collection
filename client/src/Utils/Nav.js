import React from "react";
import { Link } from "react-router-dom";

import { AppBar, Box, Button, Container, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Logo from '../Assets/logo.png';
import RecordMini from '../Assets/vinyl.png';
import MenuIcon from '@mui/icons-material/Menu';
import { connect, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';

import { logout, setIsCreated } from "../Action/actions"


const Nav = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
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
        { name: "Artists", path: "/artists" },
        { name: "Collections", path: "/collections" },
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
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Link to="/welcome" sx={{ flexGrow: 0 }}>
                        <img src={Logo} alt="Logo" width="125" height="100" />
                    </Link>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, marginLeft: '1rem' }}>
                        {pages.map((page) => (
                            <Button
                                key={page.name}
                                onClick={handleCloseNavMenu}
                                size="large"
                                sx={{ my: 2, color: 'black', display: 'block' }}
                                component={Link}
                                to={page.path}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <MenuIcon fontSize="large" />
                                <img src={RecordMini} alt="Vinyl Icon" style={{ width: '40px', height: '40px' }} />

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


