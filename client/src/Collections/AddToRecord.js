import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
    createRecord, fetchRecords, addRecordToCollection
} from "../Action/actions";

import {
    Button,
    Grid,
    Typography,
    FormControl,
    Select,
    MenuItem
} from "@mui/material";

const AddRecord = ({ setIsEdited, isEdited, handleClose, collectionId }) => {
    const dispatch = useDispatch();
    const records = useSelector((state) => state.records.records);
    const currentUser = useSelector((state) => state.session.currentUser)
    const [recordId, setRecordId] = useState(null);


    console.log("CurrentUser Id", currentUser.user.id);
    console.log("Collection Id", collectionId)
    console.log("Record id", recordId)

    useEffect(() => {
        dispatch(fetchRecords());
    }, [dispatch])

    const handleRecordChange = (e) => {
        setRecordId(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addRecordToCollection({ id: recordId, collection_id: collectionId }))
        setIsEdited(!isEdited)
        setRecordId(null)
        handleClose();
    };


    const filteredRecords = records.filter(record => record.user_id === currentUser.user.id);
    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography>Select a Collection for this Record</Typography>
                    <FormControl>
                        <Select name="" value={recordId} onChange={handleRecordChange}>
                            {filteredRecords.map((record) => {
                                return (
                                    <MenuItem key={record.id} value={record.id} >
                                        {record.title}
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
