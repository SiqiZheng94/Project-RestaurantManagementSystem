import axios from "axios";
import {DishDTO} from "../model/DishDTO.ts";

export const getAllDishesApi = ()=>{
    return axios.get("api/admin/menu")
        .then(response=> response.data)
}
export const deleteThisDishApi = (id:string)=>{
    return axios.delete("api/admin/menu/delete/" + id)
}
export const updateThisDishApi = (id:string, updatedDishDto:DishDTO)=>{
    return axios.put("api/admin/menu/update/" + id, updatedDishDto)
        .then(response=> response.data)
}
export const getAllFilteredDishesApi = (params)=>{
    return axios.get("api/admin/menu/filter", {params: params })
        .then(response=> response.data)
}

export const addANewDish = (dishDto:DishDTO)=>{
    return axios.post("/menu/add", dishDto)
}