import React, { useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
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

const AddRecord = ({ setIsEdited, isEdited, handleCloseAddRecord, setShouldFetchRecords }) => {
    const dispatch = useDispatch();
    const collections = useSelector((state) => state.collections.collections);
    const currentUser = useSelector((state) => state.session.currentUser)
    const [title, setTitle] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [collectionId, setCollectionId] = useState(0);

    console.log(currentUser.id);
    console.log(title)
    console.log("imageUrl:", imageUrl)
    console.log(collectionId)

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleImageChange = (e) => {
        setImageUrl(e.target.value);
    }

    const handleCollectionChange = (e) => {
        setCollectionId(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("dispatching createRecord action");
        console.log("imageUrl:", imageUrl)
        console.log("currentUser.id", currentUser.id)
        dispatch(createRecord({ title, image_url: imageUrl, user_id: currentUser.id, collection_id: collectionId }));
        setIsEdited(!isEdited);
        setShouldFetchRecords(true);
        setTitle("");
        setImageUrl("");
        handleCloseAddRecord();
    };

    const filteredCollections = collections.filter(collection => collection.user_id === currentUser.id);

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
                    <Typography>Select a Collection for this Record</Typography>
                    <FormControl>
                        <Select value={collectionId} onChange={handleCollectionChange}>
                            {filteredCollections.map((collection) => {
                                return (
                                    <MenuItem key={collection.id} value={collection.id} collection={collection.title}>
                                        {collection.name}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                    <div>
                        <Button type="submit">
                            Add Record
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </form>

    );
};
const mapStateToProps = (state) => {
    const collections = state.collections.collections
    return { collections };
};

const mapDispatchToProps = (dispatch) => ({
    createRecord: () => dispatch(createRecord()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddRecord)
