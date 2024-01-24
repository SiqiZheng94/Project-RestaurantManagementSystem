import {Button, InputNumber, Select, Space, Table, Tag, Typography} from "antd";
import {DishInCart} from "../model/DishInCart.ts";
import {useEffect, useState} from "react";
import {deleteDishInCartApi, getAllDishesApi, getAllDishesInCartApi} from "../API";

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
            })
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
                // onChange={(value) => handleQuantityChange(record, value)}
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