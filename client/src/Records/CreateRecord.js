import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    createRecord,
} from "../Action/actions";

import {
    TextField,
    Button,
    Grid,
    Typography,
    FormControl,
    Select,
    MenuItem
} from "@mui/material";



function CreateRecord({ handleCloseAddRecord }) {
    const dispatch = useDispatch();
    const artists = useSelector((state) => state.artists.artists)
    const currentUser = useSelector((state) => state.user.currentUser)
    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [collectionId, setCollectionId] = useState(0);
    const [collectionName, setCollectionName] = useState('');
    const [artistId, setArtistId] = useState(0);
    const [artistName, setArtistName] = useState('');
    const [artistImageUrl, setArtistImageUrl] = useState('');
    const [creatingCollection, setCreatingCollection] = useState(false);
    const [creatingArtist, setCreatingArtist] = useState(false);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleImageChange = (event) => {
        setImageUrl(event.target.value);
    };

    const handleCollectionChange = (event) => {
        setCollectionId(event.target.value);
    };

    const handleNewCollectionChange = (event) => {
        setCollectionName(event.target.value);
    };

    const handleArtistChange = (event) => {
        setArtistId(event.target.value);
    };

    const handleNewArtistChange = (event) => {
        setArtistName(event.target.value);
    };

    const handleNewArtistImageUrlChange = (event) => {
        setArtistImageUrl(event.target.value);
    };


    const handleCreateCollectionClick = (event) => {
        event.preventDefault();
        setCreatingCollection(true);
        setCollectionId(0);
    };

    const handleCreateArtistClick = (event) => {
        event.preventDefault();
        setCreatingArtist(true);
        setArtistId(0);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("dispatching createRecord action");
        console.log("imageUrl:", imageUrl);
        console.log("currentUser.id", currentUser.id);
        console.log("collecion_id", collectionId)

        const recordData = {
            title,
            image_url: imageUrl,
            collection_name: collectionName,
            artist_name: artistName,
            artist_image: artistImageUrl
        };

        if (collectionId) {
            recordData.collection_id = collectionId;
        }

        if (artistId) {
            recordData.artist_id = artistId;
        }

        dispatch(createRecord(recordData));
        setTitle("");
        setImageUrl("");
        setCollectionId(0);
        setCollectionName("");
        setArtistId(0);
        setArtistName("");
        handleCloseAddRecord();
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="title"
                        label="Title"
                        variant="standard"
                        fullWidth
                        value={title}
                        onChange={handleTitleChange}
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
                    {creatingCollection ? (
                        <FormControl>
                            <TextField
                                required
                                id="collection_name"
                                label="Collection Name"
                                variant="standard"
                                fullWidth
                                value={collectionName}
                                onChange={handleNewCollectionChange}
                            />
                        </FormControl>
                    ) : (
                        <>
                            <Typography>Select a Collection for this Record</Typography>
                            <FormControl>
                                <Select value={collectionId} onChange={handleCollectionChange}>
                                    <MenuItem value={0}>-- Select an existing collection --</MenuItem>
                                    {currentUser.collections.map((collection) => {
                                        return (
                                            <MenuItem key={collection.id} value={collection.id}>
                                                {collection.name}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                            <Typography>Or create a new collection:</Typography>
                            <Button onClick={handleCreateCollectionClick}>Create a collection</Button>
                        </>
                    )}
                </Grid>
                <Grid item xs={12}>
                    {creatingArtist ? (
                        <FormControl>
                            <TextField
                                required
                                id="artist_name"
                                label="Artist Name"
                                variant="standard"
                                fullWidth
                                value={artistName}
                                onChange={handleNewArtistChange}
                            />
                            <TextField
                                required
                                id="artist_image_url"
                                label="Artist Image URL"
                                variant="standard"
                                fullWidth
                                value={artistImageUrl}
                                onChange={handleNewArtistImageUrlChange}
                            />
                        </FormControl>
                    ) : (
                        <>
                            <Typography>Select an Artist for this Record</Typography>
                            <FormControl>
                                <Select value={artistId} onChange={handleArtistChange}>
                                    <MenuItem value={0}>-- Select an existing artist --</MenuItem>
                                    {artists.map((artist) => {
                                        return (
                                            <MenuItem key={artist.id} value={artist.id}>
                                                {artist.name}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                            <Typography>Or create a new artist:</Typography>
                            <Button onClick={handleCreateArtistClick}>Create an artist</Button>
                        </>
                    )}
                </Grid>
                <Grid item xs={12}>
                    <div>
                        <Button type="submit">Add Record</Button>
                    </div>
                </Grid>
            </Grid>
        </form>
    );
}
export default CreateRecord
