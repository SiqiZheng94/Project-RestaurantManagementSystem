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
export const getAllFilteredDishesApi = (params:any)=>{
    return axios.get("api/admin/menu/filter", {params: params })
}
export const createNewDishApi = (dishDto:DishDTO)=>{
    return axios.post("api/admin/menu/add", dishDto)
}
export const showOrderDetailsApi = (id:string)=>{
    return axios.get("api/admin/orders/" + id)
}
export const getAllOrdersApi = ()=>{
    return axios.get("api/admin/orders")
}
export const updateOrderStatusApi = (id:string)=>{
    return axios.put("api/admin/orders/update-status/" + id)
}
// Customer
export const addDishInCartApi = (dishInCartDto:DishInCartDTO)=>{
    return axios.post("api/user/shoppingCart/add", dishInCartDto)
}
export const getAllDishesInCartApi = ()=>{
    return axios.get("api/user/shoppingCart")
}
export const deleteDishInCartApi = (id:string)=>{
    return axios.delete("api/user/shoppingCart/delete/" + id)
}
export const changeQuantityApi = (dishInCartDto:DishInCartDTO)=>{
    return axios.put("api/user/shoppingCart/update", dishInCartDto)
}
export const creatOrderAndLeerCartApi = ()=>{
    return axios.get("api/user/shoppingCart/payment")
}

