import Meta from "antd/es/card/Meta";
import {Button, Card, InputNumber, Tag, Typography} from "antd";
import { Dish } from "../model/Dish.ts";
import {useEffect, useState} from "react";
import { addDishInCartApi } from "../API";
import { DishInCartDTO } from "../model/DishInCartDTO.ts";

type MenuOrderingProps = {
    dishes: Dish[],
}
export default function MenuOrdering(props: MenuOrderingProps) {
    const dishesList = props.dishes;

    const [cart, setCart] = useState({}); // 用于存储购物车中的菜品数量
    const [inputValues, setInputValues] = useState({}); // 用于存储InputNumber的值
    const addToCart = (dishId, quantity) => {
        // 更新购物车中的菜品数量
        const dishInCartDTO: DishInCartDTO = {
            dishId: dishId,
            amount: quantity,
        };
        addDishInCartApi(dishInCartDTO);
        setCart({ ...cart, [dishId]: quantity });
    };


    return (
        <div className={"menu-display-container"}>
            {dishesList.map((dish: Dish) => (

                <Card
                    // className={"menu-card"}
                    className={`menu-card ${!dish.availability ? 'disabled-card' : ''}`} // 根据 dish.availability 来添加禁用状态样式类
                    key={dish._id} // 添加一个唯一的 key 属性
                    hoverable
                    style={{ width: 230, height: 380 }}
                    cover={
                        <img
                            alt="sushi"
                            src={dish.imageURL}
                            style={{
                                objectFit: "cover",
                                width: "100%",
                                height: "200px",
                            }}
                        />
                    } // 使用 dish 的图片 URL
                >
                    <Meta title={dish.name} description={dish.description} />
                    <div className="menu-details">
                        <Typography.Text className="menu-price" style={{ fontSize: "16px", marginTop: "10px", fontWeight: "bold" }}>
                            Price: {dish.price} €
                        </Typography.Text>
                        {dish.vegetarian && (
                            <Tag color={"green"}>Vegetarian</Tag>
                        )}
                    </div>
                    <div className="menu-controls">
                        <InputNumber
                            min={0}
                            value={inputValues[dish.dishId] || 0} // 设置 InputNumber 的值为 inputValues 中的数量
                            onChange={(value) => setInputValues({ ...inputValues, [dish.dishId]: value })} // 更新 inputValues 中的数量
                            onPressEnter={() => {
                                const inputValue = inputValues[dish.dishId] || 0;
                                if (inputValue > 0) {
                                    addToCart(dish.dishId, inputValue);
                                }
                            }}
                        />
                        <Button
                            onClick={() => {
                                const inputValue = inputValues[dish.dishId] || 0;
                                if (inputValue > 0) {
                                    addToCart(dish.dishId, inputValue);
                                }
                            }}
                        >
                            Add to Cart
                        </Button>
                    </div>
                </Card>
            ))}
        </div>
    );
}
