import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, CardActions, CardMedia, Card, CardContent, Divider, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputAdornment, IconButton, Tooltip, CssBaseline, Box, Grid, Container, Typography, TextField } from '@mui/material';
import { fetchRecords, deleteRecord } from '../Action/actions';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SideNav from '../Utils/SideNav';
import RecordDetail from '../Records/RecordDetail';
import Recs from '../Assets/recs.png'
import EditRecord from '../Records/EditRecord';
import { current } from '@reduxjs/toolkit';

const theme = createTheme();

export const Records = () => {
    const dispatch = useDispatch();
    const [isEdited, setIsEdited] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false)
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [detailOpen, setDetailOpen] = useState(false);
    const [editRecordId, setEditRecordId] = useState(null);

    const records = useSelector((state) => state.user.records);
    const currentUser = useSelector((state) => state.user.currentUser);
    const collections = useSelector((state) => state.user.collections);


    console.log("currentUser", currentUser)
    console.log("records", records)


    useEffect(() => {
        if (isEdited, isDeleted, collections) {
            dispatch(fetchRecords());
            setIsEdited(false);
            setIsDeleted(false);
        }
    }, [currentUser, dispatch, isEdited, isDeleted]);



    const handleEditOpen = (record) => {
        setEditOpen(true);
        setEditRecordId(record.id);
        console.log("Edit", record.id)
    };

    const handleDeleteOpen = (record) => {
        console.log('record to delete:', record)
        setDeleteOpen(true);
        setEditRecordId(record.id);
        console.log("Delete", record.id)
    };

    const handleDetailOpen = (record) => {
        setDetailOpen(true);
        setEditRecordId(record.id)
    };

    const handleClose = () => {
        setEditOpen(false);
        setDeleteOpen(false);
        setDetailOpen(false);
        setIsEdited(true);
    }

    const handleDelete = () => {
        dispatch(deleteRecord(editRecordId));
        setIsDeleted(true);
        handleClose();
    };


    return (
        <div>
            <ThemeProvider theme={theme}>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <SideNav isEdited={isEdited} setIsEdited={setIsEdited} />

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

                        <>
                            <Container sx={{ display: 'flex', py: 0 }} maxWidth="l">
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item>
                                        <img src={Recs} alt="Logo" width="400" height="150" />
                                    </Grid>

                                </Grid>
                            </Container>
                            <Container sx={{ py: 3 }} maxWidth="100%">

                                <Grid container spacing={4}>
                                    {records
                                        .map((record, index) => (
                                            <Grid item key={index} xs={12} sm={6} md={8} lg={2}>
                                                <Card
                                                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                                >
                                                    <CardMedia
                                                        component="img"
                                                        image={record.image_url}
                                                        alt="record_image" />
                                                    <CardContent sx={{ flexGrow: 1 }}>
                                                        <Typography gutterBottom variant="h5" component="h2">
                                                            {record.title}
                                                        </Typography>
                                                        <Typography>
                                                            {record.artists.map(artist => artist.name).join(', ')}
                                                        </Typography>
                                                        <Divider />
                                                        <Typography gutterBottom variant='h6' component="h6" sx={{ mt: 2 }}>
                                                            Collections:
                                                        </Typography>
                                                        <Typography>{record.collection.name}</Typography>
                                                    </CardContent>
                                                    <CardActions>
                                                        <Tooltip title="Delete">
                                                            <IconButton onClick={() => handleDeleteOpen(record)}>
                                                                <DeleteForeverIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Dialog open={deleteOpen} onClose={handleClose}>
                                                            <DialogTitle>Delete Record?</DialogTitle>
                                                            <DialogContent>
                                                                <DialogContentText>
                                                                    Are you sure you want to delete this artist? This will also remove them from any records they are associated with in your collection.
                                                                </DialogContentText>
                                                            </DialogContent>
                                                            <DialogActions>
                                                                <Button onClick={() => { handleDelete(record) }}>Yes, Please Delete</Button>
                                                                <Tooltip title="Cancel">
                                                                    <IconButton onClick={handleClose}>
                                                                        <CloseIcon />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </DialogActions>
                                                        </Dialog>

                                                        <Tooltip title="Edit Record">
                                                            <IconButton onClick={() => handleEditOpen(record.id)}>
                                                                <EditIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Dialog open={editOpen} onClose={handleClose}>
                                                            <DialogContent>
                                                                <EditRecord recordId={editRecordId} handleClose={handleClose} record={record} setIsEdited={setIsEdited} isEdited={isEdited} />
                                                            </DialogContent>
                                                            <DialogActions>
                                                                <Tooltip title="Cancel">
                                                                    <IconButton onClick={handleClose}>
                                                                        <CloseIcon />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </DialogActions>
                                                        </Dialog>


                                                        <Tooltip title="Record Details">
                                                            <IconButton onClick={() => handleDetailOpen(record.id)}>
                                                                <MoreHorizIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Dialog open={detailOpen} onClose={handleClose}>
                                                            <DialogContent>
                                                                <RecordDetail record={record} recordId={editRecordId} currentUser={currentUser} />
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
                        </>
                    </Box>
                </Box>
            </ThemeProvider>
        </div>
    );

}

export default Records
