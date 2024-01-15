import axios from "axios";

export const getOrders= ()=>{
    return axios.get("api/admin")
        .then(response=>
            response.data
        )
}