import { createSlice } from "@reduxjs/toolkit";
import { fetchRecords, fetchRecordById, createRecord, editRecord, deleteRecord } from "../Action/actions";

export const initialState = {
    records: [],
    currentRecord: [],
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
        createRecord: (state, action) => {
            state.records.push(action.payload);
            console.log("Add Record triggered in Slice")

        },
        deleteRecord: (state, action) => {
            return state.filter((record) => record.id !== action.payload);
        },
        editRecord: (state, action) => {
            const updatedRecord = action.payload;
            const index = state.records.findIndex((record) => record.id === updatedRecord.id);
            if (index !== -1) {
                state.records = [
                    ...state.records.slice(0, index),
                    updatedRecord,
                    ...state.records.slice(index + 1),
                ];
            }
        },
        addRecordToCollection: (state, action) => {
            const { id, collection_id } = action.payload;
            const record = state.find((r) => r.id === id);
            if (record) {
                record.collection_id = collection_id;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRecords.fulfilled, (state, action) => {
            console.log('fetchRecords.fulfilled:', action.payload);
            const records = action.payload.map((record) => {
                const { id, ...rest } = record;
                return { ...rest, id };
            });
            console.log('records:', records);
            return { ...state, records };
        });
        builder.addCase(fetchRecordById.fulfilled, (state, action) => {
            state.currentRecord = action.payload;
        });
    },
});

export default recordSlice.reducer

