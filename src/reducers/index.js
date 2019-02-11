const initialData = [];

const getData = (state=initialData,action) =>{
    let data = [];
    switch (action.type){
        case "GET_QUERY_DATA":
        data = action.payload;
        break;
        default:
        data = initialData;
        break;
    }

    return {
        ...state,
        initialData:data,
    }
}

export default getData;