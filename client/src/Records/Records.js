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
import AddToCollection from './AddToCollection';
import EditRecord from '../Records/EditRecord';

const theme = createTheme();

export const Records = () => {
    const dispatch = useDispatch();
    const [isEdited, setIsEdited] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [detailOpen, setDetailOpen] = useState(false);
    const [editRecordId, setEditRecordId] = useState(null);

    const records = useSelector((state) => state.user.records);
    const currentUser = useSelector((state) => state.user.currentUser);


    console.log("currentUser records", currentUser)
    console.log("records", records)

    const handleEditOpen = (recordId) => {
        setEditOpen(true);
        setEditRecordId(recordId);
    };

    const handleAddOpen = (recordId) => {
        setAddOpen(true);
        setEditRecordId(recordId);
        setIsEdited(!isEdited)
    };

    const handleDeleteOpen = (record) => {
        console.log('record to delete:', record)
        setDeleteOpen(true);
        setEditRecordId(record.id);
    };

    const handleDetailOpen = (recordId) => {
        setDetailOpen(true);
        setEditRecordId(recordId)
    };

    const handleClose = () => {
        setEditOpen(false);
        setDeleteOpen(false);
        setAddOpen(false);
        setDetailOpen(false);
        setIsEdited(!isEdited)
    }

    const handleDelete = () => {
        dispatch(deleteRecord(editRecordId));
        setIsEdited(!isEdited);
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
                                                            {/* {record.artists.map(artist => artist.name).join(', ')} */}
                                                        </Typography>
                                                        <Divider />
                                                        <Typography gutterBottom variant='h6' component="h6" sx={{ mt: 2 }}>
                                                            Collections:
                                                        </Typography>
                                                        {/* {currentUser.records.map(record => {
                                                            const collection = currentUser.collections.find(c => c.id === record.collection_id);
                                                            const collectionName = collection ? collection.name : 'unknown';
                                                            return (
                                                                <Typography key={record}>{collectionName}</Typography>
                                                            );
                                                        })} */}
                                                        {/* <Typography>
                                                            {currentUser.records.collection_id === currentUser.collections.id}
                                                        </Typography> */}
                                                    </CardContent>
                                                    {/* <CardActions>


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
                                                                <EditRecord recordId={editRecordId} handleClose={handleClose} setIsEdited={setIsEdited} isEdited={isEdited} />
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
                                                                <RecordDetail recordId={editRecordId} currentUser={currentUser} />
                                                            </DialogContent>
                                                            <DialogActions>
                                                                <Tooltip title="Cancel">
                                                                    <IconButton onClick={handleClose}>
                                                                        <CloseIcon />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </DialogActions>
                                                        </Dialog>
                                                    </CardActions> */}
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
