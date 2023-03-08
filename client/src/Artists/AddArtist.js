import React, { useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
    createArtist,
} from "../Action/actions";

import {
    Alert,
    TextField,
    Snackbar,
    Button,
    Grid,
} from "@mui/material";

const AddArtist = ({ setIsEdited, isEdited, handleCloseAddArtist, setShouldFetchArtists }) => {
    const status = useSelector((state) => state.artists.status);
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(null)

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    if (status === "rejected") {
        setOpen(true);
    }

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleImageChange = (event) => {
        setImageUrl(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await dispatch(createArtist({ name, image_url: imageUrl }));
            setIsEdited(isEdited);
            setName("");
            setImageUrl("");
            handleCloseAddArtist();
            setShouldFetchArtists(true);
        } catch (error) {
            console.log("Submit Error:", error.message)
            setError(error.message)
            setOpen(true);
        }
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
            {error && (
                <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                    <Alert severity="error">{error}</Alert>
                </Snackbar>
            )}
        </form>

    );
};
const mapStateToProps = (state) => {
    const artists = state.artists.artists
    return { artists };
};

const mapDispatchToProps = (dispatch) => ({
    createArtist: (artist) => dispatch(createArtist(artist)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddArtist)
