import React, { useEffect, useState } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert, CssBaseline, Box, Card, CardContent, Grid, Container, Typography, TextField, Button } from '@mui/material';
import Profile from '../Assets/profile.png'
import SideNav from '../Utils/SideNav';
import { fetchRecords, fetchCollections, fetchArtists } from '../Action/actions';
import { current } from '@reduxjs/toolkit';

const theme = createTheme();

export const UserProfile = () => {
    const records = useSelector((state) => state.user.records);
    const collections = useSelector((state) => state.collections.collections);
    const currentUser = useSelector((state) => state.user.currentUser);

    console.log(currentUser)

    const collectionsWithRecordCounts = collections.map(collection => ({
        ...collection,
        recordCount: records.filter(record => record.collection_id === collection.id).length
    }));

    const collectionWithMostRecords = collectionsWithRecordCounts.reduce((acc, curr) => {
        return curr.recordCount > acc.recordCount ? curr : acc;
    }, { recordCount: 0 });

    const totalCollections = collections.filter(collection => collection.user_id === currentUser.id).length
    const totalRecords = records.filter(record => record.user_id === currentUser.id).length;

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <SideNav />
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
                    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <img src={Profile} alt="Logo" width="300" height="100" />
                            </Grid>

                            <Grid item xs={12}>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Box sx={{ mb: 3 }}>
                                        <Card sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
                                            <CardContent sx={{ flexGrow: 1 }}>
                                                <Box>
                                                    <Typography variant="h3" gutterBottom>
                                                        Welcome,
                                                    </Typography>
                                                    <Typography variant="h5" gutterBottom>
                                                        You currently have {totalCollections} collections.
                                                    </Typography>
                                                    <Typography variant="h5" gutterBottom>
                                                        You currently have {totalRecords} records.
                                                    </Typography>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Box>
                                    <Box sx={{ mb: 3 }}>
                                        <Card sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
                                            <CardContent sx={{ flexGrow: 1 }}>
                                                <Box>
                                                    <Typography variant="h5" gutterBottom>
                                                        Collection with the most records:
                                                    </Typography>
                                                    <Typography variant="h5" gutterBottom>
                                                        {collectionWithMostRecords.name}
                                                    </Typography>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}


const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({

});


export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)

