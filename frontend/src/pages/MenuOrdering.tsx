import Meta from "antd/es/card/Meta";
import {Button, Card, InputNumber} from "antd";
import {Dish} from "../model/Dish.ts";
import {useState} from "react";
import {addDishInCart} from "../API";
import {DishInCartDTO} from "../model/DishInCartDTO.ts";

type MenuOrderingProps = {
    dishes: Dish[],
    getDishes: () => void,
}
export default function MenuOrdering(props: MenuOrderingProps){
   const dishesList = props.dishes;
    const [cart, setCart] = useState({}); // 用于存储购物车中的菜品数量

    const addToCart = (dishId, quantity) => {
        // 更新购物车中的菜品数量
        const dishInCartDTO: DishInCartDTO = {
            dishId: dishId,
            amount: quantity,
        };
        addDishInCart(dishInCartDTO);
        setCart({ ...cart, [dishId]: quantity });
    };
    return (
        <div className={"menu-display-container"}>
            {dishesList.map((dish: Dish) => (
                <Card className={"menu-card"}
                    key={dish._id} // 添加一个唯一的 key 属性
                    hoverable
                    style={{ width: 230, height: 380 }}
                    cover={<img alt="sushi" src={dish.imageURL} style={{ objectFit: 'cover', width: '100%', height: '200px' }} />} // 使用 dish 的图片 URL

                >
                    <Meta title={dish.name} description={dish.description} />
                    <div className="menu-controls">
                        <InputNumber
                            min={1}
                            defaultValue={1}
                            onChange={(value) => addToCart(dish.dishId, value)}
                        />
                        <Button type="primary" onClick={() => addToCart(dish.dishId, 1)}>
                            Add to Cart
                        </Button>
                    </div>
                </Card>
            ))}
        </div>

    );
}
