import axios from "axios";
import {Dish} from "../entity/Dish.ts";

export const getAllDishesApi = ()=>{
    return axios.get("api/admin")
        .then(response=>
            response.data
        )
        .catch(error => {
            console.error("Error deleting the item:", error)
        })
}
export const deleteThisDishApi = (id:string)=>{
    return axios.delete("api/admin/dish/delete/" + id)
        .catch(error => {
            console.error("Error deleting the item:", error)
        })
}
export const updateThisDishApi = (selectedDish:Dish)=>{
    return axios.put("api/admin/dish/update", selectedDish)
        .catch(error => {
            console.error("Error deleting the item:", error)
        })
}