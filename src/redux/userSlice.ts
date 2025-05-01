import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "users",
    initialState: [],
    reducers: {
        addUser: () => { }
    }
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;