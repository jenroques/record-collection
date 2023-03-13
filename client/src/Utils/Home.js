import React, { useEffect } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box, Card, CardContent, Grid, Container, Typography } from '@mui/material';

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


    const recordCounts = {};

    // users.forEach((user) => {
    //     const recordCount = user.records.filter(record => record.user_id === user.id).length;
    //     recordCounts[user.id] = recordCount;
    // });

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
                                                <Typography variant="h3" gutterBottom>
                                                    Ready to get started?
                                                </Typography>
                                                <Typography variant="h5" gutterBottom sx={{ ml: 10 }}>
                                                    Add records to your digital collections.
                                                    View fellow collectors collections.
                                                    Add artists to the Artist Database.
                                                </Typography>
                                                <Typography variant="h5" gutterBottom sx={{ ml: 10 }}>
                                                    First step: Head over to the Collections page and create your first collection!
                                                </Typography>
                                                <Typography variant="h5" gutterBottom sx={{ ml: 10 }}>
                                                    Seconds step: Head to the Records page,add a record and select which collection you want to contain the new record.
                                                </Typography>
                                                <Typography variant="h5" gutterBottom sx={{ ml: 10 }}>
                                                    You can add the record to it's artist at anytime via the Artist Database.
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Box>
                                    <Box sx={{ mb: 3 }}>
                                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                            <CardContent sx={{ flexGrow: 1 }}>
                                                <br />
                                                {/* <Typography variant="h4" gutterBottom> Collector Community Stats:  </Typography>
                                                <Typography variant="h5" gutterBottom sx={{ ml: 30 }}> There are currently {totalCollections} total collections </Typography>
                                                <Typography variant="h5" gutterBottom sx={{ ml: 30 }}> There are currently {totalArtists} artists in the Artist Database </Typography>
                                                <br />
                                                <Typography variant="h4" gutterBottom> Record Collector's Stats: </Typography>
                                                <Typography variant="h5" gutterBottom sx={{ ml: 30 }}> Top user, {topUser.username} , currently has the most records added to their collections</Typography> */}
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
