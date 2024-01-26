import {Button, Modal, Space, Table, Typography} from "antd";
import {DishInCart} from "../model/DishInCart.ts";
import {useEffect, useState} from "react";
import {getAllOrdersApi, showOrderDetailsApi} from "../API";
import {Order} from "../model/Order.ts";
import {Dish} from "../model/Dish.ts";

function Orders () {
    const [dataSource, setDataSource] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
    const [showingOrderDetails, setShowingOrderDetails] = useState<Order | null>(null);
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

    function showDetails(order: Order) {
        setShowingOrderDetails(order);
        setEditModalVisible(true);
    }
    const handleModalCancel = () => {
        setShowingOrderDetails(null);
        setEditModalVisible(false);
    };

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
            dataIndex: "totalPriceSum",
            render: (text) => (
                <span>
                    {text} €
                </span>
            ),
        },
        {
            title: "Action",
            render: (record: DishInCart) => (
                <Space size="middle">
                    <Button onClick={() => showDetails(record)}>Detail</Button>
                </Space>
            ),
        },
    ];
    return (
        <div>
            <Typography.Title level={4}>Orders</Typography.Title>
            <Table
                columns={columns}
                loading={loading}
                dataSource={dataSource.map((order) => ({
                    ...order,
                    key: order._id,
                }))}
            />
            <Modal
                title="Order Details"
                open={editModalVisible}
                onCancel={handleModalCancel}
                // footer={null}
            >

            </Modal>
        </div>
    )
}
export default Orders