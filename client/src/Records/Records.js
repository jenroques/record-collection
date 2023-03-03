import React, { useEffect, useState } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, IconButton, CardActions, CardMedia, Card, CardContent, InputAdornment, CssBaseline, Box, Toolbar, Paper, Grid, Container, Typography, TextField } from '@mui/material';
import { fetchRecords } from '../Action/actions';
import SearchIcon from '@mui/icons-material/Search';
import SideNav from '../Utils/SideNav';
import Search from '@mui/icons-material/Search';

const theme = createTheme();



export const Records = (props) => {
    const dispatch = useDispatch();
    const records = useSelector((state) => state.records.records);

    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        dispatch(fetchRecords());
    }, [dispatch]);

    console.log(records)

    const filteredRecords = records.filter((record) =>
        record.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                        {/* End hero unit */}
                        <Grid container spacing={4}>
                            {filteredRecords.map((record) => (
                                <Grid item key={record} xs={12} sm={6} md={8} lg={2}>
                                    <Card
                                        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                    >
                                        <CardMedia
                                            component="img"
                                            image={record.image_url}
                                            alt="record_image"
                                        />
                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {record.title}
                                            </Typography>
                                            <Typography>
                                                {record.artists.map(artist => artist.name).join(', ')}
                                            </Typography>
                                            <Typography gutterBottom variant='h6' component="h6" sx={{ mt: 2 }}>
                                                Collections:
                                            </Typography>
                                            <Typography>
                                                {record.collection.name}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small">View</Button>
                                            <Button size="small">Edit</Button>
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


export default Records;
