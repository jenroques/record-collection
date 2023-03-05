import React, { useEffect, useState } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, CardActions, Card, CardContent, Divider, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputAdornment, IconButton, Tooltip, CssBaseline, Box, Grid, Container, Typography, TextField } from '@mui/material';
import { fetchCollections, deleteCollection, fetchUsers } from '../Action/actions';
import SearchIcon from '@mui/icons-material/Search';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import SideNav from '../Utils/SideNav';
import EditCollection from './EditCollection';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';


const theme = createTheme();


export const Collections = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.session.currentUser);
    const collections = useSelector((state) => state.collections.collections);
    const userState = useSelector(state => state.user.users || [])
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [editCollectionId, setEditCollectionId] = useState(null);
    const [isEdited, setIsEdited] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    console.log(currentUser)

    useEffect(() => {
        dispatch(fetchCollections());
        console.log("Fetch Collections", collections)
    }, [dispatch, isEdited]);

    useEffect(() => {
        dispatch(fetchUsers());
        console.log("Fetch Users", userState)
    }, [dispatch, isEdited]);

    useEffect(() => {
        if (userState.length === 0) {
        } else {
            console.log("UserState:", userState);
        }
    }, [userState]);


    const handleEditOpen = (collectionId) => {
        setEditOpen(true);
        setEditCollectionId(collectionId);
    };

    const handleDeleteOpen = (collectionId) => {
        setDeleteOpen(true);
        setEditCollectionId(collectionId);
    };

    const handleClose = () => {
        setEditOpen(false);
        setDeleteOpen(false);
        setIsEdited(!isEdited)
    };

    const handleDelete = (collection) => {
        dispatch(deleteCollection(collection.id));
        setIsEdited(!isEdited);
        handleClose();
    };

    const filteredCollections = collections.filter((collection) =>
        collection.name.toLowerCase().includes(searchQuery.toLowerCase())
    ).sort((a, b) => a.id - b.id)
    const usernames = filteredCollections.map((collection) => {
        const user = userState.find(user => user.id === collection.user_id);
        return user ? user.username : '';
    });

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
                    <Container sx={{ display: 'flex', py: 0 }} maxWidth="md">
                        <TextField
                            sx={{
                                mt: 5,
                                mr: 5,
                            }}
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
                    </Container>
                    <Container sx={{ py: 3 }} maxWidth="100%">
                        <Grid container spacing={4}>
                            {filteredCollections.map((collection, index) => (
                                <Grid item key={collection.id} xs={12} sm={6} md={8} lg={2}>
                                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {collection.name}
                                            </Typography>
                                            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                                                Created by: {usernames[index]}
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
                                        <CardActions>
                                            {currentUser && currentUser.id === collection.user_id && (
                                                <><Tooltip title="Delete">
                                                    <IconButton onClick={handleDeleteOpen}>
                                                        <DeleteForeverIcon />
                                                    </IconButton>
                                                </Tooltip><Dialog open={deleteOpen} onClose={handleClose}>
                                                        <DialogTitle>Delete Collection?</DialogTitle>
                                                        <DialogContent>
                                                            <DialogContentText>
                                                                Are you sure you want to delete this Collection? This will also remove them from any records they are associated with in your collection.
                                                            </DialogContentText>
                                                        </DialogContent>
                                                        <DialogActions>
                                                            <Button onClick={() => { handleDelete(collection); }}>Yes, Please Delete</Button>
                                                            <Tooltip title="Cancel">
                                                                <IconButton onClick={handleClose}>
                                                                    <CloseIcon />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </DialogActions>
                                                    </Dialog><Tooltip title="Edit Collection">
                                                        <IconButton onClick={() => handleEditOpen(collection.id)}>
                                                            <EditIcon />
                                                        </IconButton>
                                                    </Tooltip><Dialog open={editOpen} onClose={handleClose}>
                                                        <DialogContent>
                                                            <EditCollection collectionId={editCollectionId} handleClose={handleClose} setIsEdited={setIsEdited} isEdited={isEdited} />
                                                        </DialogContent>
                                                        <DialogActions>
                                                            <Tooltip title="Cancel">
                                                                <IconButton onClick={handleClose}>
                                                                    <CloseIcon />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </DialogActions>
                                                    </Dialog></>
                                            )}
                                        </CardActions>
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

const mapStateToProps = (state) => {
    // const userState = state.users.users
    // return { userState }
};

const mapDispatchToProps = (dispatch) => ({
    fetchUsers: () => dispatch(fetchUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Collections)
