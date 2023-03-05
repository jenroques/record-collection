import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import {
    createArtist,
} from "../Action/actions";

import {
    TextField,
    Button,
    Grid,
} from "@mui/material";

const AddArtist = ({ setIsEdited, isEdited, handleCloseAddArtist }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [imageUrl, setImageUrl] = useState("");


    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleImageChange = (event) => {
        setImageUrl(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(createArtist({ name, image_url: imageUrl }));
        setIsEdited(!isEdited)
        setName("");
        setImageUrl("");
        handleCloseAddArtist();
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="name"
                        label="Name"
                        variant="standard"
                        fullWidth
                        value={name}
                        onChange={handleNameChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="image_url"
                        label="Image URL"
                        variant="standard"
                        fullWidth
                        value={imageUrl}
                        onChange={handleImageChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit">
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </form>

    );
};
const mapStateToProps = (state, ownProps) => {
    const artists = state.artists.artists
    return { artists };
};

const mapDispatchToProps = (dispatch) => ({
    createArtist: (artist) => dispatch(createArtist(artist)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddArtist)
