import { dataRef } from "../config/firebase";

export const ADD_QUERY = "ADD_QUERY";
export const GET_QUERY_DATA = "GET_QUERY_DATA";

export const getQuery = (type) => dispatch => {
    dataRef.on("value", snap => {
        dispatch({
            type: type,
            payload: snap.val()
        });
    });
};

export const addQuery = data => {
    dataRef.push().set(data);
};