import {DishInCart} from "./DishInCart.ts";

export type Order =  {
    _id: string,
    localDateTime: string,
    status: string,
    dishesInCart: DishInCart[],
    totalPriceSum: number,
}