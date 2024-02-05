import { Dish } from "../model/Dish.ts";
import {useEffect, useState} from "react";
import {addDishInCartApi, getAllDishesApi} from "../API";
import { DishInCartDTO } from "../model/DishInCartDTO.ts";
import MenuCard from "../components/MenuCard.tsx";
import {Typography} from "antd";
import Spinner from 'react-bootstrap/Spinner';



export default function MenuOrdering() {
    const [dataSource, setDataSource] = useState<Dish[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true); // 加载状态
    const fetchData = () => {
        getAllDishesApi()
            .then(response => {
                setDataSource(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }

    // store the number of dishes in the cart
    const [cart, setCart] = useState({});
    const [inputValues] = useState({});
    const addToCart = (dishId:number, quantity:number) => {
        const dishInCartDTO: DishInCartDTO = {
            dishId: dishId,
            amount: quantity,
        };
        addDishInCartApi(dishInCartDTO);
        setCart({...cart, [dishId]: quantity});
    };

    // Grouping of dishes according to categories
    const categorizedDishes = {
        "Side Dishes": dataSource.filter((dish: Dish) => dish.category === "SIDE_DISHES"),
        "Maki & Rolls": dataSource.filter((dish: Dish) => dish.category === "MAKI_ROLLS"),
        "Nigiri & Gunkan": dataSource.filter((dish: Dish) => dish.category === "NIGIRI_GUNKAN"),
        "Temaki": dataSource.filter((dish: Dish) => dish.category === "TEMAKI"),
        "Yaki Veggie": dataSource.filter((dish: Dish) => dish.category === "YAKI_VEGGIE"),
        "Fry": dataSource.filter((dish: Dish) => dish.category === "FRY"),
        "Drink": dataSource.filter((dish: Dish) => dish.category === "DRINK"),
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <>
            {isLoading && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 9999,
                }}>
                    {/* 加载状态的 UI，可以自定义样式和内容 */}
                    <div className="d-flex align-items-center">
                        <Spinner animation="grow" as="output" variant="primary">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    </div>
                </div>
            )}
                <div style={{filter: isLoading ? 'blur(5px)' : 'none'}}>
                    {Object.keys(categorizedDishes).map((category) => (
                        <div key={category}>
                            <Typography.Title level={4} style={{color: "#FE6F5E",}} className={"separator"}>
                                {category}
                            </Typography.Title >
                            <div className={"menu-display-container"}>
                                {(categorizedDishes as any)[category].map((dish: Dish) => (
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
                </div>
        </>
    );
}