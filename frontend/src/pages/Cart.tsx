import {Button, InputNumber, Select, Space, Table, Tag, Typography} from "antd";
import {DishInCart} from "../model/DishInCart.ts";
import {useEffect, useState} from "react";
import {changeQuantityApi, deleteDishInCartApi, getAllDishesApi, getAllDishesInCartApi} from "../API";
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
            .then((response) => {
                    // 更新dataSource中的数量
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

                    // 设置新的dataSource
                    setDataSource(updatedDataSource);
            })
            .catch((error) => {
                console.error("Error updating quantity:", error);
            });
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
        render: (text: string, record: DishInCart) => (
            <InputNumber
                min={1}
                value={record.amount}
                onChange={(newAmount) => handleQuantityChange(record.dishId, newAmount)}
            />
        ),
    },
    {
        title: "Total Amount",
        dataIndex: "totalPrice",
    },
    {
        title: "Action",
        render: (text: string, record: DishInCart) => (
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
        </>

    )
}