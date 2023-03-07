import React, { useEffect } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box, Toolbar, Paper, Grid, Container, Typography } from '@mui/material';

import SideNav from '../Utils/SideNav';
import { fetchRecords, fetchCollections, fetchArtists } from '../Action/actions';

const theme = createTheme();


export const Home = () => {
    const dispatch = useDispatch();
    const records = useSelector((state) => state.records.records);
    const collections = useSelector((state) => state.collections.collections);
    const artists = useSelector((state) => state.artists.artists);
    const currentUser = useSelector((state) => state.session.currentUser);
    const totalRecords = records.length;

    console.log("Current User", currentUser)

    useEffect(() => {
        dispatch(fetchRecords());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchCollections());
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchArtists());
    }, [dispatch])

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
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>
                            {/* Chart */}
                            <Grid item xs={12} md={8} lg={9}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 240,
                                    }}
                                >
                                    <Typography> Record Stats </Typography>
                                    <Typography>Your current total of records: {totalRecords} </Typography>
                                </Paper>
                            </Grid>
                            {/* Recent Deposits */}
                            <Grid item xs={12} md={4} lg={3}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 240,
                                    }}
                                >
                                    <Typography> Artist Stats </Typography>
                                </Paper>
                            </Grid>
                            {/* Recent Orders */}
                            <Grid item xs={12}>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                    <Typography> Collection Stats </Typography>
                                </Paper>
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


export default connect(mapStateToProps, mapDispatchToProps)(Home)
