import { Dish } from "../model/Dish.ts";
import {useState} from "react";
import { addDishInCartApi } from "../API";
import { DishInCartDTO } from "../model/DishInCartDTO.ts";
import MenuCard from "../components/MenuCard.tsx";
import {Typography} from "antd";

type MenuOrderingProps = {
    dishes: Dish[],
}
export default function MenuOrdering(props: MenuOrderingProps) {
    const dishesList = props.dishes;
    // store the number of dishes in the cart
    const [cart, setCart] = useState({});
    const [inputValues, setInputValues] = useState({});
    const addToCart = (dishId, quantity) => {
        const dishInCartDTO: DishInCartDTO = {
            dishId: dishId,
            amount: quantity,
        };
        addDishInCartApi(dishInCartDTO);
        setCart({...cart, [dishId]: quantity});
    };

    // Grouping of dishes according to categories
    const categorizedDishes = {
        "Side Dishes": dishesList.filter((dish: Dish) => dish.category === "SIDE_DISHES"),
        "Maki & Rolls": dishesList.filter((dish: Dish) => dish.category === "MAKI_ROLLS"),
        "Nigiri & Gunkan": dishesList.filter((dish: Dish) => dish.category === "NIGIRI_GUNKAN"),
        "Temaki": dishesList.filter((dish: Dish) => dish.category === "TEMAKI"),
        "Yaki Veggie": dishesList.filter((dish: Dish) => dish.category === "YAKI_VEGGIE"),
        "Fry": dishesList.filter((dish: Dish) => dish.category === "FRY"),
        "Drink": dishesList.filter((dish: Dish) => dish.category === "DRINK"),
    };


    return (
        <>
            {Object.keys(categorizedDishes).map((category) => (
                <div key={category}>
                    <Typography.Title level={4} style={{color: "#ED2939",}} className={"separator"}>
                        {category}
                    </Typography.Title >
                    <div className={"menu-display-container"}>
                        {categorizedDishes[category].map((dish: Dish) => (
                            <MenuCard
                                key={dish._id}
                                dish={dish}
                                addToCart={addToCart}
                                values={inputValues}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </>
    );
}