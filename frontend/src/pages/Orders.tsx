import {Button, Space, Table, Typography} from "antd";
import {DishInCart} from "../model/DishInCart.ts";
import {useEffect, useState} from "react";
import {getAllOrdersApi} from "../API";

function Orders () {
    const [dataSource, setDataSource] = useState<DishInCart[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        getAllOrdersApi()
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
            dataIndex: "_id",
        },
        {
            title: "Status",
            dataIndex: "status",
        },
        {
            title: "Order Time",
            dataIndex: "localDateTime",
        },
        {
            title: "Total Amount",
            dataIndex: "totalPrice",
        },
        {
            title: "Action",
            render: (record: DishInCart) => (
                <Space size="middle">
                    <Button >Detail</Button>
                </Space>
            ),
        },
    ];
    return (
        <>
            <Typography.Title level={4}>Orders</Typography.Title>
            <Table
                columns={columns}
                loading={loading}
                dataSource={dataSource.map((order) => ({
                    ...order,
                    key: order._id,
                }))}
            />
        </>
    )
}
export default Orders