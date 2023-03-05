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

export const RecordArtist = ({ handleClose, isEdited, setIsEdited, recordId }) => {
    const dispatch = useDispatch();
    const [artistName, setArtistName] = useState("");
    const artists = useSelector((state) => state.artists.artists);

    const handleRecordChange = (e) => {
        setArtistName(e.target.value);
    };

    console.log(artistName)
    console.log(recordId)

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(artistName)
        dispatch(addArtistToRecord({ recordId: recordId, artistName: artistName }));
        setArtistName("")
        handleClose();
        setIsEdited(!isEdited);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography>Add an artist to this Record?</Typography>
                </Grid>
                <Grid item xs={12}>
                    <>
                        <Typography>Select an Artist</Typography>
                        <FormControl>

                            <Select value={artistName} onChange={handleRecordChange}>
                                {artists.map((artist) => {
                                    return (
                                        <MenuItem value={artist.name}>
                                            {artist.name}
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

export default connect(mapStateToProps, mapDispatchToProps)(RecordArtist);
