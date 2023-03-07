import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
    addArtistToRecord, fetchArtistById,
} from "../Action/actions";

import {
    FormControl,
    MenuItem,
    Select,
    Button,
    Grid,
    Typography
} from "@mui/material";

const ManageArtistRecord = ({ artistId, handleClose, isEdited, setIsEdited }) => {
    const dispatch = useDispatch();
    const currentArtist = useSelector((state) => state.artists.currentArtist)
    const [recordId, setRecordId] = useState("");
    const [recordTitle, setRecordTitle] = useState("");
    const records = useSelector((state) => state.records.records);

    useEffect(() => {
        dispatch(fetchArtistById(artistId))
    }, [isEdited, recordId])

    const handleRecordChange = (event) => {
        const selectedRecord = records.find((record) => record.id === parseInt(event.target.value));
        setRecordId(event.target.value);
        setRecordTitle(selectedRecord.title);
    };

    console.log("Record Title", recordTitle)
    console.log("Record ID", recordId)
    console.log("Current Artist", currentArtist.name)
    console.log("Artist ID", artistId)

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(recordTitle)
        dispatch(addArtistToRecord({ id: recordId, name: currentArtist.name }));
        setRecordId("");
        setRecordTitle("");
        handleClose();
        setIsEdited(!isEdited);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography>Add {currentArtist.name} to a Record?</Typography>
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
