import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Grid, Button, Typography, TextField } from '@mui/material'

import { editCollection } from '../Action/actions'

export const EditCollection = ({ collection, handleClose, isEdited, setIsEdited }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState(collection ? collection.name : '')


    const handleNameChange = (event) => {
        setName(event.target.value);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await dispatch(editCollection({ id: collection.id, name }));
            handleClose();
            setIsEdited(!isEdited)
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Typography variant="h6" gutterBottom>
                Edit Collection:
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="name"
                        name="name"
                        label="Collection Name"
                        fullWidth
                        variant="standard"
                        value={name}
                        onChange={handleNameChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button onClick={handleSubmit}> Submit Edits </Button>
                </Grid>
            </Grid></div>
    )
}

const mapStateToProps = (state, ownProps) => {
    const collection = state.collections.collections.find((collection) => collection.id === ownProps.collectionId);
    return { collection };
};

const mapDispatchToProps = (dispatch) => ({
    editCollection: (collection) => dispatch(editCollection(collection)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCollection);
