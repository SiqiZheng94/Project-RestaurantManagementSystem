import {Button, Select, Space, Table, Tag, Typography} from "antd";
import {Dish} from "../model/Dish.ts";
import {useEffect, useState} from "react";
import {getAllDishesApi, getAllDishesInCartApi} from "../API";

export default function Cart(){
    const [dataSource, setDataSource] = useState<Dish[]>([]);
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

    const columns = [
    {
        title: "ID",
        dataIndex: "dishId",
    },
    {
        title: "Category",
        dataIndex: "category",
    },
    {
        title: "Name",
        dataIndex: "name",
    },
    {
        title: "Amount",
        dataIndex: "amount",
    },
    {
        title: "Price",
        dataIndex: "price",
    },
    {
        title: "Action",
        render: (text: string, record: Dish) => (
            <Space size="middle">
                <Button >Edit</Button>
                <Button >Delete</Button>
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