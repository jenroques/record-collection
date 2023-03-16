import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box, Card, CardContent, Grid, Container, Typography, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

import WelcomeRC from '../Assets/welcomerc.png'
import SideNav from '../Utils/SideNav';
import RecordMini from '../Assets/vinyl.png';

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
                                        <Box sx={{ mb: 3 }}>
                                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                                <CardContent sx={{ flexGrow: 1 }}>
                                                    <Typography variant="h6" gutterBottom>
                                                        View your Records to begin
                                                    </Typography>
                                                    <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                                                        <Link to="/records" style={{ textDecoration: 'none' }}>
                                                            <IconButton sx={{ p: 1 }}>
                                                                <img src={RecordMini} alt="View Records" style={{ width: '54px', height: '54px' }} />
                                                            </IconButton>
                                                        </Link>
                                                        <Typography variant="body1" sx={{ ml: 1 }}>
                                                            Records
                                                        </Typography>

                                                    </Box>
                                                </CardContent>
                                            </Card>
                                        </Box>


                                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                            <CardContent sx={{ flexGrow: 1 }}>
                                                <Typography variant="h5" gutterBottom>
                                                    Total Number of Records in Collection
                                                </Typography>
                                                <Typography variant="h3" gutterBottom sx={{ ml: 1 }}>
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
