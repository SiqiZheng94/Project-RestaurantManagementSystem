import Meta from "antd/es/card/Meta";
import { Button, Card, InputNumber, Tag, Typography } from "antd";
import { Dish } from "../../model/Dish.ts";
import { useState } from "react";

type MenuCardProps = {
    dish: Dish;
    addToCart: (dishId: number, quantity: number) => void;
    values: { [key: number]: number };
};

export default function MenuCard(props: MenuCardProps) {
    const [inputValue, setInputValue] = useState<number>(
        props.values[props.dish.dishId] || 0
    );

    const handleInputChange = (value: number | string | undefined) => {
        const parsedValue = parseInt(value as string, 10);
        setInputValue(parsedValue);
    };

    const handlePressEnter = () => {
        if (inputValue > 0) {
            props.addToCart(props.dish.dishId, inputValue);
        }
    };

    return (
        <Card
            className={`menu-card ${
                !props.dish.availability ? "disabled-card" : ""
            }`}
            key={props.dish._id}
            hoverable
            style={{ width: 230, height: 380 }}
            cover={
                <img
                    alt="sushi"
                    src={props.dish.imageURL}
                    style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "200px",
                    }}
                />
            }
        >
            <Meta title={props.dish.name} description={props.dish.description} />
            <div className="menu-details">
                <Typography.Text
                    className="menu-price"
                    style={{
                        fontSize: "14px",
                        marginTop: "10px",
                        fontWeight: "bold",
                        color: "#ED2939",
                    }}
                >
                    Price: {props.dish.price} €
                </Typography.Text>
                {props.dish.vegetarian && <Tag color={"green"}>Vegetarian</Tag>}
            </div>
            <div className="menu-controls">
                <InputNumber
                    min={0}
                    value={inputValue}
                    onChange={handleInputChange}
                    onPressEnter={handlePressEnter}
                />
                <Button className="submit-button"
                    onClick={() => {
                        if (inputValue > 0) {
                            props.addToCart(props.dish.dishId, inputValue);
                        }
                    }}
                >
                    Add to Cart
                </Button>
            </div>
        </Card>
    );
}
