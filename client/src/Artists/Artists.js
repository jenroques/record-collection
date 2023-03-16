import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, CardActions, CardMedia, Card, CardContent, Divider, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputAdornment, IconButton, Tooltip, CssBaseline, Box, Grid, Container, Typography, TextField } from '@mui/material';
import { fetchArtists, deleteArtist } from '../Action/actions';
import SearchIcon from '@mui/icons-material/Search';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import SideNav from '../Utils/SideNav';
import EditArtist from './EditArtist';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ManageArtistRecord from './ManageArtistRecord';
import Arts from '../Assets/arts.png'

const theme = createTheme();


export const Artists = () => {
    const dispatch = useDispatch();
    const artists = useSelector((state) => state.artists.artists);
    const records = useSelector((state) => state.user.records);
    const currentUser = useSelector((state) => state.user.currentUser);
    const [isEdited, setIsEdited] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');


    useEffect(() => {
        if (isEdited, records) {
            dispatch(fetchArtists());
            setIsEdited(false);
        }
    }, [currentUser, dispatch, isEdited, records]);

    console.log(artists)
    console.log("CurrentUser", currentUser)

    const filteredArtists = artists.filter((artist) =>
        artist.name.toLowerCase().includes(searchQuery.toLowerCase())
    ).sort((a, b) => a.name.localeCompare(b.name));
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <SideNav setIsEdited={setIsEdited} isEdited={isEdited} />
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
                    <Container sx={{ display: 'flex', py: 0 }} maxWidth="l">
                        <Grid container spacing={2} alignItems="center">
                            <Grid item>
                                <img src={Arts} alt="Logo" width="400" height="150" />
                            </Grid>
                            <Grid item xs>
                                <TextField
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    label="Search by Name"
                                    variant="standard"
                                    value={searchQuery}
                                    fullWidth
                                    onChange={(event) => setSearchQuery(event.target.value)}
                                />
                            </Grid>
                        </Grid>
                    </Container>
                    <Container sx={{ py: 3 }} maxWidth="100%">
                        <Grid container spacing={4}>
                            {filteredArtists.map((artist) => (
                                < Grid item key={artist} xs={12} sm={6} md={8} lg={2}>
                                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                        <CardMedia component="img" image={artist.image_url} alt="record_image" />
                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {artist.name}
                                            </Typography>
                                            <Divider />
                                            <Typography gutterBottom variant="h6" component="h6" sx={{ mt: 2 }}>
                                                Records:
                                            </Typography>
                                            {artist.records.map((record) => (
                                                <Typography key={record.id}>{record.title}</Typography>
                                            ))}
                                        </CardContent>

                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider >
    );

}


export default Artists;
