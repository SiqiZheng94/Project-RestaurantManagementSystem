import {Button, Modal, Space, Table, Tag, Typography} from "antd";
import {useEffect, useState} from "react";
import {getAllOrdersApi, updateOrderStatusApi} from "../API";
import {Order} from "../model/Order.ts";
import { format } from "date-fns";

function Orders () {
    const [dataSource, setDataSource] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    function fetchOrders() {
        setLoading(true);
        getAllOrdersApi()
            .then((response) => {
                // Use the sort method to sort the orders in reverse chronological order.
                const sortedData = response.data.sort((a, b) => {
                    return new Date(b.localDateTime) - new Date(a.localDateTime);
                });
                setDataSource(sortedData);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }
    useEffect(() => {
        fetchOrders();
    }, []);

    function updateOrderStatus(id: string){
        updateOrderStatusApi(id)
            .then(() => {
                fetchOrders();
                setEditModalVisible(false);
            })
            .catch((error) => {
                console.error("Error updating order status:", error);
            });
    }

    function showDetails(order: Order) {
        setSelectedOrder(order);
        setEditModalVisible(true);
    }
    const handleModalCancel = () => {
        setSelectedOrder(null);
        setEditModalVisible(false);
    };

    function formatLocalDateTime(localDateTime: string): string {
        const date = new Date(localDateTime);
        return format(date, "yyyy-MM-dd HH:mm:ss");
    }


    const columns = [
        {
            title: "ID",
            dataIndex: "_id",
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (status: string) => (
                <>
                    {status==="OPEN" && <Tag color={"volcano"}>Open</Tag>}
                    {status==="IN PROGRESS" && <Tag color={"processing"}>In Progress</Tag>}
                    {status==="FINISHED" && <Tag color={"default"}>Finished</Tag>}
                </>
            ),
        },
        {
            title: "Order Time",
            dataIndex: "localDateTime",
            render: (localDateTime: string) => formatLocalDateTime(localDateTime),
        },
        {
            title: "Total Amount",
            dataIndex: "totalPriceSum",
            render: (text: string) => (<span>{text} €</span>),
        },
        {
            title: "Action",
            render: (record: Order) => (
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
                footer={null}
            >
                {selectedOrder && (
                    <div>
                        <p>ID: {selectedOrder._id}</p>
                        <p>Status: {selectedOrder.status}</p>
                        <p>Order Time: {selectedOrder.localDateTime}</p>
                        <p>Total Amount: {selectedOrder.totalPriceSum} €</p>
                        <p>Selected Dishes:</p>
                        <Table
                            columns={[
                                {
                                    title: "Dish ID",
                                    dataIndex: "dishId",
                                    key: "dishId",
                                },
                                {
                                    title: "Name",
                                    dataIndex: "name",
                                    key: "name",
                                },
                                {
                                    title: "Amount",
                                    dataIndex: "amount",
                                    key: "amount",
                                },
                                {
                                    title: "Price",
                                    dataIndex: "totalPrice",
                                    key: "totalPrice",
                                    render: (text) => <span>{text} €</span>,
                                },
                            ]}
                            dataSource={selectedOrder.dishesInCart.map((dish) => ({
                                key: dish._id,
                                dishId: dish.dishId,
                                name: dish.name,
                                amount: dish.amount,
                                totalPrice: dish.totalPrice,
                            }))}
                        />
                        {selectedOrder.status==="OPEN" && <button onClick={()=>updateOrderStatus(selectedOrder._id)}>Prepare Order</button>}
                        {selectedOrder.status==="IN PROGRESS" && <button onClick={()=>updateOrderStatus(selectedOrder._id)}>Finish Order</button>}
                    </div>
                )}
            </Modal>
        </div>
    )
}
export default Orders