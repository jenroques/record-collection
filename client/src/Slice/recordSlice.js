import { createSlice } from "@reduxjs/toolkit";
import { fetchRecords, fetchRecordById, createRecord, updateRecord, deleteRecord } from "../Action/actions";

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
            return state.filter((record) => record.id !== action.payload.id);
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
        builder.addCase(createRecord.fulfilled, (state, action) => {
            console.log("createRecord.fulfilled:", action.payload);
            state.records.push(action.payload);
        });
    },
});

export default recordSlice.reducer

