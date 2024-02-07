import {Button, InputNumber, message, Space, Table, Typography} from "antd";
import {DishInCart} from "../model/DishInCart.ts";
import {useEffect, useState} from "react";
import {
    changeQuantityApi,
    creatOrderAndLeerCartApi,
    deleteDishInCartApi,
    getAllDishesInCartApi
} from "../API";
import {DishInCartDTO} from "../model/DishInCartDTO.ts";

export default function Cart(){
    const [dataSource, setDataSource] = useState<DishInCart[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        getAllDishesInCartApi()
            .then(response => {
                setDataSource(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, []);

    function deleteDishInCart(id: string) {
        const updatedDishes = dataSource.filter(dish=> dish._id !== id);
        setDataSource(updatedDishes);

        deleteDishInCartApi(id)
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false);
            })
    }

    function handleQuantityChange(id: number, newAmount: number) {
        const dishInCartDto: DishInCartDTO = {
            dishId: id,
            amount: newAmount,
        };

        changeQuantityApi(dishInCartDto)
            .then(() => {
                    const updatedDataSource = dataSource.map((dishInCartDto) => {
                        if (dishInCartDto.dishId === id) {
                            return {
                                ...dishInCartDto,
                                amount: newAmount,
                                totalPrice: dishInCartDto.onePiecePrice * newAmount,
                            };
                        }
                        return dishInCartDto;
                    });

                    setDataSource(updatedDataSource);
            })
            .catch((error) => {
                console.error("Error updating quantity:", error);
            });
    }

    async function creatOrderAndLeerCart() {
        try {
            await creatOrderAndLeerCartApi();

            const response = await getAllDishesInCartApi();
            setDataSource(response.data);
            message.success('Your order has been successfully transmitted!');
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    }

    function calculateTotalAmount() {
        let total = 0;
        for (const dish of dataSource) {
            total += dish.totalPrice;
        }
        return total.toFixed(2);
    }

    const columns = [
    {
        title: "Name",
        dataIndex: "name",
    },
    {
        title: "Description",
        dataIndex: "description",
    },
    {
        title: "Quantity",
        dataIndex: "amount",
        render: (_text: string, record: DishInCart) => (
            <InputNumber
                min={1}
                value={record.amount}
                onChange={(newAmount) => {
                    if (newAmount !== null) {
                        handleQuantityChange(record.dishId, newAmount);
                    }
                }}
            />

        ),
    },
    {
        title: "Total Amount",
        dataIndex: "totalPrice",
        render: (_text: string, record: DishInCart) => (
            <span>{record.totalPrice.toFixed(2)}</span>
        ),
    },
    {
        title: "Action",
        render: (record: DishInCart) => (
            <Space size="middle">
                <Button onClick={() => deleteDishInCart(record._id)}>Delete</Button>
            </Space>
        ),
    },
];

    return (
        <>
            <Typography.Title level={4}>Cart</Typography.Title>
            <Table
                columns={columns}
                loading={loading}
                dataSource={dataSource.map((dish) => ({
                    ...dish,
                    key: dish.dishId.toString(),
                }))}
            />
            <div className="MultipleElementsInaRow">
                <Typography.Title level={5} style={{ color: "#FE6F5E" }}>Total: {calculateTotalAmount()}€</Typography.Title>
                <Button className="submit-button" onClick={() => creatOrderAndLeerCart()}>Payment</Button>
            </div>
        </>
    )
}