import { createSlice } from "@reduxjs/toolkit";
import { fetchRecords, fetchRecordById, createRecord, updateRecord, deleteRecord } from "../Action/actions";

export const initialState = {
    records: [],
    currentRecord: {},
}

export const recordSlice = createSlice({
    name: "records",
    initialState,
    reducers: {
        setRecordId(state, action) {
            const { id, record } = action.payload;
            const index = state.findIndex((r) => r.id === id);
            state[index] = { ...record, id };
        },
        setCurrentRecord: (state, action) => {
            state.currentRecord(action.payload);
        },
        addRecord: (state, action) => {
            state.push(action.payload);
        },
        deleteRecord: (state, action) => {
            return state.filter((record) => record.id !== action.payload.id);
        },
        updateRecord: (state, action) => {
            const { id, ...updatedFields } = action.payload;
            const recordIndex = state.findIndex((record) => record.id === id);
            state[recordIndex] = { ...state[recordIndex], ...updatedFields };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRecords.fulfilled, (state, action) => {
            return action.payload.map((record) => {
                const { id, ...rest } = record;
                return { ...rest, id };
            });
        });
        builder.addCase(fetchRecordById.fulfilled, (state, action) => {
            const { id } = action.payload;
            const index = state.findIndex((record) => record.id === id);
            if (index !== -1) {
                state[index] = action.payload;
            } else {
                state.push(action.payload);
            }
        });
        builder.addCase(createRecord.fulfilled, (state, action) => {
            state.push(action.payload);
        });
        builder.addCase(updateRecord.fulfilled, (state, action) => {
            const { id } = action.payload;
            const index = state.findIndex((record) => record.id === id);
            state[index] = action.payload;
        });
        builder.addCase(deleteRecord.fulfilled, (state, action) => {
            return state.filter((record) => record.id !== action.payload.id);
        });
    },
});

export default recordSlice.reducer

