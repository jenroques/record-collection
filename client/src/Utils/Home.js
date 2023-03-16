import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box, Card, CardContent, Grid, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import WelcomeRC from '../Assets/welcomerc.png'
import SideNav from '../Utils/SideNav';

const theme = createTheme();


export const Home = () => {
    const dispatch = useDispatch();
    const records = useSelector((state) => state.user.records);
    const collections = useSelector((state) => state.collections.collections);
    const artists = useSelector((state) => state.artists.artists);
    const currentUser = useSelector((state) => state.user.currentUser)

    console.log(currentUser)




    const recordCount = records.length;


    // const topUserId = Object.keys(recordCounts).reduce((a, b) => recordCounts[a] > recordCounts[b] ? a : b);

    // const topUser = users.find(user => user.id === parseInt(topUserId));

    // const totalArtists = artists.length;
    // const totalCollections = collections.reduce((total, collection) => {
    //     return total + collection.records.length;
    // }, 0);

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex' }} >
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
                        width: '100%',
                        overflow: 'auto',
                    }}
                >
                    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <img src={WelcomeRC} alt="Logo" width="500" height="200" />
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Box sx={{ mb: 3 }}>
                                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                            <CardContent sx={{ flexGrow: 1 }}>
                                                <Typography variant="h5" gutterBottom>
                                                    Ready to get started?
                                                </Typography>
                                                <Typography variant="h5" gutterBottom sx={{ ml: 10 }}>
                                                    <Link to="/records">
                                                        Head over to your 'Records' to begin.
                                                    </Link>
                                                </Typography>
                                            </CardContent>
                                        </Card> <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                            <CardContent sx={{ flexGrow: 1 }}>
                                                <Typography variant="h5" gutterBottom>
                                                    Total number of records in collection:
                                                </Typography>
                                                <Typography variant="h5" gutterBottom sx={{ ml: 10 }}>
                                                    {recordCount}
                                                </Typography>
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


export default Home;
