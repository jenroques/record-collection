import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Grid, Button, Typography, TextField } from '@mui/material'

import { editRecord } from '../Action/actions'

export const EditRecord = ({ record, handleClose, isEdited, setIsEdited }) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState(record ? record.title : '')
    const [imageUrl, setImageUrl] = useState(record ? record.image_url : '')

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleImageUrlChange = (event) => {
        setImageUrl(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await dispatch(editRecord({ id: record.id, title, image_url: imageUrl }));
            handleClose();
            setIsEdited(!isEdited)
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Typography variant="h6" gutterBottom>
                Edit Record:
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="title"
                        name="title"
                        label="Record Name"
                        fullWidth
                        variant="standard"
                        value={title}
                        onChange={handleTitleChange}
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
    const record = state.records.records.find((record) => record.id === ownProps.recordId);
    return { record };
};

const mapDispatchToProps = (dispatch) => ({
    editRecord: (record) => dispatch(editRecord(record)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditRecord);
