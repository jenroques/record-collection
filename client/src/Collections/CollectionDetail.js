import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Card, CardContent, Divider, CssBaseline, Box, Grid, Typography } from '@mui/material';
import { fetchCollectionById } from '../Action/actions';


const theme = createTheme();

export const CollectionDetail = ({ collectionId }) => {
    const dispatch = useDispatch();
    const currentCollection = useSelector((state) => state.collections.currentCollection);
    const userState = useSelector(state => state.user.users || [])
    const [collectionDetail, setCollectionDetail] = useState([])
    console.log(collectionId)

    useEffect(() => {
        dispatch(fetchCollectionById(collectionId));
    }, [dispatch, collectionId]);

    useEffect(() => {
        setCollectionDetail(currentCollection);
    }, [currentCollection, setCollectionDetail]);

    console.log(collectionDetail);

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Grid container spacing={4} >
                    <Grid item key={collectionId} >
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {collectionDetail.name}
                                </Typography>
                                <Divider />
                                <Typography gutterBottom variant="h6" component="h6" sx={{ mt: 2 }}>
                                    Records:
                                </Typography>
                                {collectionDetail.records && collectionDetail.records.map((record) => (
                                    <>
                                        <Typography key={record.id}>{record.title}</Typography>
                                        <Typography variant="body2">
                                            Added by: {collectionDetail.users.find(user => user.id === record.user_id)?.username}
                                        </Typography>
                                    </>
                                ))}
                                <Typography>{collectionDetail.collection && collectionDetail.collection.name}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </ThemeProvider>
    );
}
export default CollectionDetail;
