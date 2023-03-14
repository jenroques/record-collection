import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CardMedia, Card, CardContent, Divider, CssBaseline, Box, Grid, Container, Typography } from '@mui/material';
import { fetchRecordById } from '../Action/actions';



const theme = createTheme();

export const RecordDetail = ({ record }) => {
    const [recordDetail, setRecordDetail] = useState([])


    useEffect(() => {
        setRecordDetail(record);
    }, [record, setRecordDetail]);

    console.log(record);

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Grid container spacing={4} sx={{ width: 500 }}>
                    <Grid item key={record.id} >
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardMedia component="img" image={recordDetail.image_url} width="50%" height="50%" alt="record_image" />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {recordDetail.title}
                                </Typography>
                                <Typography>
                                    {recordDetail && recordDetail.artists && recordDetail.artists.length > 0 &&
                                        recordDetail.artists.map(artist => artist.name).filter(name => name).join(', ')}
                                </Typography>
                                <Divider />
                                <Typography gutterBottom variant="h6" component="h6" sx={{ mt: 2 }}>
                                    Collections:
                                </Typography>
                                <Typography>{recordDetail.collection && recordDetail.collection.name}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </ThemeProvider>
    );
}
export default RecordDetail;
