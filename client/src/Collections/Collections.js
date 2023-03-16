import React, { useEffect, useState } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, CardActions, Card, CardContent, Divider, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputAdornment, IconButton, Tooltip, CssBaseline, Box, Grid, Container, Typography, TextField } from '@mui/material';
import { fetchCollections, deleteCollection, fetchUsers } from '../Action/actions';
import SearchIcon from '@mui/icons-material/Search';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import SideNav from '../Utils/SideNav';
import AddToRecord from './AddToRecord';
import EditCollection from './EditCollection';
import CollectionDetail from './CollectionDetail';
import CloseIcon from '@mui/icons-material/Close';
import MapsUgcIcon from '@mui/icons-material/MapsUgc';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Collects from '../Assets/collects.png'


const theme = createTheme();


export const Collections = () => {
    const dispatch = useDispatch();

    const [isEdited, setIsEdited] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const collections = useSelector((state) => state.user.collections);
    const currentUser = useSelector((state) => state.user.currentUser);
    const records = useSelector((state) => state.user.records)

    console.log("Current User", currentUser)
    console.log("collections", collections)

    useEffect(() => {
        if (isEdited, records) {
            dispatch(fetchCollections());
            setIsEdited(false);
        }
    }, [currentUser, dispatch, records]);

    const filteredCollections = collections.filter((collection) =>
        collection.name.toLowerCase().includes(searchQuery.toLowerCase())
    ).sort((a, b) => a.id - b.id);

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
                                <img src={Collects} alt="Logo" width="400" height="150" />
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
                            {filteredCollections.map((collection, index) => (
                                <Grid item key={index} xs={12} sm={6} md={8} lg={2}>
                                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {collection.name}
                                            </Typography>
                                            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                                                Created by: {currentUser.username}
                                            </Typography>
                                            <Divider />
                                            <Typography gutterBottom variant="h6" component="h6" sx={{ mt: 2 }}>
                                                Records:
                                            </Typography>
                                            {collection.records.length > 0 ? (
                                                collection.records.map((record) => (
                                                    <>
                                                        <Typography key={record.id}>{record.title}</Typography>
                                                    </>
                                                ))
                                            ) : (
                                                <Typography>No Records Currently in Collection</Typography>
                                            )}
                                        </CardContent>

                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>

    );

}

export default Collections;
