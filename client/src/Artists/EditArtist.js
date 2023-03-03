import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Grid, Button, Typography, TextField } from '@mui/material'

import { editArtist } from '../Action/actions'

export const EditArtist = ({ artist, handleClose, isEdited, setIsEdited }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState(artist.name)
    const [imageUrl, setImageUrl] = useState(artist.image_url)

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleImageUrlChange = (event) => {
        setImageUrl(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await dispatch(editArtist({ id: artist.id, name, image_url: imageUrl }));
            handleClose();
            setIsEdited(!isEdited)
        } catch (error) {
            console.log(error);
        }
    };

    console.log(artist.id)

    return (
        <div>
            <Typography variant="h6" gutterBottom>
                Edit Artist:
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="name"
                        name="name"
                        label="Artist Name"
                        fullWidth
                        variant="standard"
                        value={name}
                        onChange={handleNameChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="image_url"
                        name="image_url"
                        label="Image URL"
                        fullWidth
                        variant="standard"
                        value={imageUrl}
                        onChange={handleImageUrlChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button onClick={handleSubmit}> Submit Edits </Button>
                </Grid>
            </Grid></div>
    )
}

const mapStateToProps = (state, ownProps) => {
    const artist = state.artists.artists.find((artist) => artist.id === ownProps.artistId);
    return { artist };
};

const mapDispatchToProps = (dispatch) => ({
    onEdit: (artist) => dispatch(editArtist(artist)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditArtist);
