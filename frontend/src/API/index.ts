import axios from "axios";

export const getAllDishes= ()=>{
    return axios.get("api/admin")
        .then(response=>
            response.data
        )
}
