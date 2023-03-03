import React, { useState, forwardRef, useImperativeHandle } from 'react'
import { Link, useHistory } from "react-router-dom";
import { connect, useDispatch } from 'react-redux'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box, Button, Toolbar, List, Divider, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import MuiDrawer from '@mui/material/Drawer';
import RecordMini from '../Assets/vinyl.png';

import AddArtist from '../Artists/AddArtist';
import CreateCollection from '../Collections/CreateCollection';
import AddRecord from '../Records/AddRecord';

import { logout, setIsCreated } from "../Action/actions"

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const theme = createTheme();

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const UtilityDialog = (props) => {
    const { open, handleClose, dialogContent } = props;


    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Subscribe</DialogTitle>
            <DialogContent>
                {dialogContent}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>Submit</Button>
            </DialogActions>
        </Dialog>
    );
};

const SideNav = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const [openAddRecord, setOpenAddRecord] = useState(false);
    const [openAddArtist, setOpenAddArtist] = useState(false);
    const [openAddCollection, setOpenAddCollection] = useState(false);


    const handleOpenAddRecord = () => {
        setOpenAddRecord(true);
        console.log("Add Record is open")
    }

    const handleCloseAddRecord = () => {
        setOpenAddRecord(false);
        console.log("Add Record is close")
    }

    const handleOpenAddArtist = () => {
        setOpenAddArtist(true);
        console.log("Add Artist is open")
    }

    const handleCloseAddArtist = () => {
        setOpenAddArtist(false);
        console.log("Add Artist is closed")
    }

    const handleOpenAddCollection = () => {
        setOpenAddCollection(true);
        console.log("Add Collection is open")
    }

    const handleCloseAddCollection = () => {
        setOpenAddCollection(false);
        console.log("Add Collection is closed")
    }

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleLogout = () => {
        console.log("Trying to logout")
        dispatch(logout())
            .then(() => {
                dispatch(setIsCreated(false))
                history.push('/login');
            });
    }


    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>

                    </Toolbar>
                    <Divider />
                    <List component="nav" sx={{ mt: 4 }}>
                        <IconButton onClick={handleOpenAddRecord}>
                            <img src={RecordMini} alt="Vinyl Icon" style={{ position: 'sticky', width: '40px', height: '40px', marginLeft: "4px" }} />
                            <Typography variant="button" sx={{ ml: 3 }}>Add Record</Typography>
                        </IconButton>
                        <UtilityDialog open={openAddRecord} onClose={handleCloseAddRecord} dialogContent={<AddRecord />} />
                        <Divider sx={{ my: 1 }} />
                        <IconButton onClick={handleOpenAddArtist}>
                            <PersonAddIcon alt="Artist Icon" style={{ position: 'sticky', width: '40px', height: '40px', marginLeft: "4px" }} />
                            <Typography variant="button" sx={{ ml: 3 }}>Add Artist</Typography>
                        </IconButton>
                        <UtilityDialog open={openAddArtist} onClose={handleCloseAddArtist} dialogContent={<AddArtist />} />
                        <Divider sx={{ my: 1 }} />
                        <IconButton onClick={handleOpenAddCollection}>
                            <LibraryMusicIcon alt="Vinyl Icon" style={{ position: 'sticky', width: '40px', height: '40px', marginLeft: "4px" }} />
                            <Typography variant="button" sx={{ ml: 3 }}>Add Record</Typography>
                        </IconButton>
                        <UtilityDialog open={openAddCollection} onClose={handleCloseAddCollection} dialogContent={<CreateCollection />} />
                        <Divider sx={{ my: 1 }} />
                    </List>
                    <List component="nav" sx={{ mt: 14 }}>
                        <Divider sx={{ my: 1 }} />
                        <Link to="/welcome">
                            <IconButton>
                                <HomeIcon alt="Home Icon" style={{ position: 'sticky', width: '40px', height: '40px', marginLeft: "4px" }} />
                                <Typography variant="button" sx={{ ml: 3 }}>Dashboard</Typography>
                            </IconButton>
                        </Link>
                        <Divider sx={{ my: 1 }} />
                        <Link to="/me">
                            <IconButton>
                                <PersonPinIcon alt="Profile Icon" style={{ position: 'sticky', width: '40px', height: '40px', marginLeft: "4px" }} />
                                <Typography variant="button" sx={{ ml: 3 }}>Profile</Typography>
                            </IconButton>
                        </Link>
                        <Divider sx={{ my: 1 }} />
                        <IconButton onClick={handleLogout}>
                            <LogoutIcon alt="Vinyl Icon" style={{ position: 'sticky', width: '40px', height: '40px', marginLeft: "4px" }} />
                            <Typography variant="button" sx={{ ml: 3 }}>Logout</Typography>
                        </IconButton>
                        <Divider sx={{ my: 1 }} />
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                </Box>
            </Box>
        </ThemeProvider >
    )
}

export default SideNav;
