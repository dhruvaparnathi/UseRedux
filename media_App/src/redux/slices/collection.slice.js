import { createSlice } from "@reduxjs/toolkit";

let imgData = JSON.parse(localStorage.getItem("imgData")) || [];
let videoData = JSON.parse(localStorage.getItem("videoData")) || [];
let gifData = JSON.parse(localStorage.getItem("gifData")) || [];

const collectionSlice = createSlice({
    name:"collection",
    initialState:{
        imgData,
        videoData,
        gifData,
    },
    reducers:{
        addToCollection: (state, action) => {
            const {type, data} = action.payload;
            if(type === "imgData"){
                state.imgData.push(data);
                localStorage.setItem("imgData", JSON.stringify(state.imgData));
            }
            else if(type === "videoData"){
                state.videoData.push(data);
                localStorage.setItem("videoData", JSON.stringify(state.videoData));
            }
            else if(type === "gifData"){
                state.gifData.push(data);
                localStorage.setItem("gifData", JSON.stringify(state.gifData));
            }
        },
        removeFromCollection: (state, action) => {
            const {type, data} = action.payload;
            if(type === "imgData"){
                state.imgData = state.imgData.filter((item) => item.id !== data.id);
                localStorage.setItem("imgData", JSON.stringify(state.imgData));
            }
            else if(type === "videoData"){
                state.videoData = state.videoData.filter((item) => item.id !== data.id);
                localStorage.setItem("videoData", JSON.stringify(state.videoData));
            }
            else if(type === "gifData"){
                state.gifData = state.gifData.filter((item) => item.id !== data.id);
                localStorage.setItem("gifData", JSON.stringify(state.gifData));
            }
        },
        clearCollection: (state) => {
            state.imgData = [];
            state.videoData = [];
            state.gifData = [];
            localStorage.setItem("imgData", JSON.stringify(state.imgData));
            localStorage.setItem("videoData", JSON.stringify(state.videoData));
            localStorage.setItem("gifData", JSON.stringify(state.gifData));
        }
    }
});

export const {addToCollection, removeFromCollection, clearCollection} = collectionSlice.actions;
export default collectionSlice.reducer;

