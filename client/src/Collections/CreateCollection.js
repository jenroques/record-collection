import React, { useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
    createCollection,
} from "../Action/actions";

import {
    TextField,
    Button,
    Grid,
} from "@mui/material";

const CreateCollection = ({ setIsEdited, isEdited, handleCloseAddCollection }) => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.session.currentUser);
    const [name, setName] = useState("");

    console.log(name)
    console.log(currentUser.id)

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("dispatching createCollection action");
        dispatch(createCollection({ name, user_id: currentUser.id }));
        setIsEdited(!isEdited)
        setName("");
        handleCloseAddCollection();
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
                <Grid item xs={12}>
                    <Button type="submit">
                        Create Collection
                    </Button>
                </Grid>
            </Grid>
        </form>

    );
};
const mapStateToProps = (state) => {
    const currentUser = state.session.currentUser
    return { currentUser }
};

const mapDispatchToProps = (dispatch) => ({
    createCollection: (userId) => dispatch(createCollection(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateCollection)
