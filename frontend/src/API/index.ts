import axios from "axios";
import {DishDTO} from "../model/DishDTO.ts";
import {DishInCartDTO} from "../model/DishInCartDTO.ts";
// Admin
export const getAllDishesApi = ()=>{
    return axios.get("api/admin/menu")
}
export const deleteThisDishApi = (id:string)=>{
    return axios.delete("api/admin/menu/delete/" + id)
}
export const updateThisDishApi = (id:string, updatedDishDto:DishDTO)=>{
    return axios.put("api/admin/menu/update/" + id, updatedDishDto)
}
export const getAllFilteredDishesApi = (params)=>{
    return axios.get("api/admin/menu/filter", {params: params })
}

export const createNewDishApi = (dishDto:DishDTO)=>{
    return axios.post("api/admin/menu/add", dishDto)
}
// User
export const addDishInCart = (dishInCartDto:DishInCartDTO)=>{
    return axios.post("api/user/shoppingCart/add", dishInCartDto)
}