import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
    createRecord, fetchCollections, addRecordToCollection
} from "../Action/actions";

import {
    Button,
    Grid,
    Typography,
    FormControl,
    Select,
    MenuItem
} from "@mui/material";

const AddToCollection = ({ setIsEdited, isEdited, handleClose, recordId }) => {
    const dispatch = useDispatch();
    const collections = useSelector((state) => state.collections.collections);
    const currentUser = useSelector((state) => state.session.currentUser)
    const [collectionId, setCollectionId] = useState(null);


    console.log("CurrentUser Id", currentUser.id);
    console.log("Collection Id", collectionId)
    console.log("Record id", recordId)

    useEffect(() => {
        dispatch(fetchCollections());
    }, [dispatch])

    const handleCollectionChange = (e) => {
        setCollectionId(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addRecordToCollection({ id: recordId, collection_id: collectionId }))
        setIsEdited(!isEdited)
        setCollectionId(null)
        handleClose();
    };

    const filteredCollections = collections.filter(collection => collection.user_id === currentUser.id);
    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography>Select a Collection for this Record</Typography>
                    <FormControl>
                        <Select name="" value={collectionId} onChange={handleCollectionChange}>
                            {filteredCollections.map((collection) => {
                                return (
                                    <MenuItem key={collection.id} value={collection.id} >
                                        {collection.name}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                    <div>
                        <Button type="submit">
                            Add To Collection
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

export default connect(mapStateToProps, mapDispatchToProps)(AddToCollection)

