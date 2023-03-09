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
    const currentUser = useSelector((state) => state.user.currentUser);
    const [addOpen, setAddOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [editArtistId, setEditArtistId] = useState(null);
    const [isEdited, setIsEdited] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [shouldFetchArtists, setShouldFetchArtists] = useState(false);

    useEffect(() => {
        dispatch(fetchArtists());
    }, [dispatch, shouldFetchArtists, isEdited])

    useEffect(() => {
        if (shouldFetchArtists) {
            dispatch(fetchArtists());
            setShouldFetchArtists(false);
        }
    }, [dispatch, shouldFetchArtists, isEdited]);

    const handleEditOpen = (artistId) => {
        setEditOpen(true);
        setEditArtistId(artistId);
    };

    const handleAddOpen = (artistId) => {
        setAddOpen(true);
        setEditArtistId(artistId);
    };

    const handleClose = () => {
        setEditOpen(false);
        setAddOpen(false);
        setIsEdited(!isEdited)
    };
    console.log(artists)
    console.log("CurrentUser", currentUser)

    const filteredArtists = artists.filter((artist) =>
        artist.name.toLowerCase().includes(searchQuery.toLowerCase())
    ).sort((a, b) => a.name.localeCompare(b.name));
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <SideNav setIsEdited={setIsEdited} isEdited={isEdited} setShouldFetchArtists={setShouldFetchArtists} />

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
                                    label="Search"
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
                                < Grid item key={artist.id} xs={12} sm={6} md={8} lg={2}>
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
                                        <CardActions>
                                            <Tooltip title="Edit Artist">
                                                <IconButton onClick={() => handleEditOpen(artist.id)}>
                                                    <EditIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Dialog open={editOpen} onClose={handleClose}>
                                                <DialogContent>
                                                    <EditArtist artistId={editArtistId} handleClose={handleClose} setIsEdited={setIsEdited} isEdited={isEdited} />
                                                </DialogContent>
                                                <DialogActions>
                                                    <Tooltip title="Cancel">
                                                        <IconButton onClick={handleClose}>
                                                            <CloseIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </DialogActions>
                                            </Dialog>

                                            <Tooltip title="Add To Record">
                                                <IconButton onClick={() => handleAddOpen(artist.id)}>
                                                    <AddCircleIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Dialog open={addOpen} onClose={handleClose}>
                                                <DialogContent>
                                                    <ManageArtistRecord artistId={editArtistId} handleClose={handleClose} setIsEdited={setIsEdited} isEdited={isEdited} />
                                                </DialogContent>
                                                <DialogActions>
                                                    <Tooltip title="Cancel">
                                                        <IconButton onClick={handleClose}>
                                                            <CloseIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </DialogActions>
                                            </Dialog>

                                        </CardActions>
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
