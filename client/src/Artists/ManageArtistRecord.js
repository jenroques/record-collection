import React, { useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
    addArtistToRecord,
} from "../Action/actions";

import {
    FormControl,
    MenuItem,
    Select,
    Button,
    Grid,
    Typography
} from "@mui/material";

const ManageArtistRecord = ({ artistName, handleClose, isEdited, setIsEdited }) => {
    const dispatch = useDispatch();
    const [recordId, setRecordId] = useState("");
    const [recordTitle, setRecordTitle] = useState("");
    const records = useSelector((state) => state.records.records);

    const handleRecordChange = (event) => {
        const selectedRecord = records.find((record) => record.id === parseInt(event.target.value));
        setRecordId(event.target.value);
        setRecordTitle(selectedRecord.title);
    };

    console.log(recordTitle)
    console.log(recordId)

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(recordTitle)
        dispatch(addArtistToRecord({ recordId: recordId, artistName: artistName }));
        setRecordId("");
        setRecordTitle("");
        handleClose();
        setIsEdited(!isEdited);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography>Add {artistName} to a Record?</Typography>
                </Grid>
                <Grid item xs={12}>
                    <>
                        <Typography>Select a Record</Typography>
                        <FormControl>

                            <Select value={recordId} record={recordTitle} onChange={handleRecordChange}>
                                {records.map((record) => {
                                    return (
                                        <MenuItem key={record.id} value={record.id} record={record.title}>
                                            {record.title}
                                        </MenuItem>
                                    );
                                })}
                            </Select>


                        </FormControl>
                    </>
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
    const artist = state.artists.artists.find((artist) => artist.id === ownProps.artistId);
    return { artist };
};

const mapDispatchToProps = (dispatch) => ({
    addArtistToRecord: (recordId, artistName, record) => dispatch(addArtistToRecord(recordId, artistName, record)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageArtistRecord);
