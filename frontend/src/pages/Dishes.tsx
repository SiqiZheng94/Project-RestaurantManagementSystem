// import {useEffect, useState} from "react";
// import {getOrders} from "../API";
// import {Space, Table, Tag} from "antd";
// import {Dish} from "../../entity/Dish.ts";
//
//
// function Dishes() {
//     const [dataSource, setDataSource] = useState([]);
//     const [loading, setLoading] = useState(false);
//
//     useEffect(() => {
//         setLoading(true);
//         getOrders().then((res)=>{
//             setDataSource(res);
//             setLoading(false);
//         })
//     }, []);
//     return (
//         <Table
//             columns={[
//                 {
//                     title: "ID",
//                     dataIndex: "dishId",
//                 },
//                 {
//                     title: "Category",
//                     dataIndex: "category",
//                 },
//                 {
//                     title: "Name",
//                     dataIndex: "name",
//                 },
//                 {
//                     title: "Description",
//                     dataIndex: "description",
//                 },
//                 {
//                     title: "Price",
//                     dataIndex: "price",
//                 },
//                 {
//                     title: "Availability",
//                     dataIndex: "availability",
//                     render: (availability) => (
//                         <>
//                             {availability ? (
//                                 <Tag color={"green"}>YES</Tag>
//                             ) : (
//                                 <Tag color={"red"}>NO</Tag>
//                             )}
//                         </>
//                     ),
//                 },
//                 {
//                     title: "Action",
//                     render: (text, record) => (
//                         <Space size="middle">
//                             <a onClick={() => showEditModal(record)}>Edit</a>
//                             <a>Delete</a>
//                         </Space>
//                     ),
//                 },
//             ]}
//
//             loading={loading}
//             dataSource={dataSource.map((dish:Dish) => ({
//                 ...dish,
//                 key: dish.dishId.toString(), // Assigning 'id' as the unique key
//             }))}
//         >
//         </Table>
//     )
// }
// export default Dishes;
import React, { useEffect, useState } from "react";
import { getOrders } from "../API";
import { Space, Table, Tag, Modal, Form, Input, Button } from "antd";
import { Dish } from "../../entity/Dish.ts";

function Dishes() {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingDish, setEditingDish] = useState(null);

    const showEditModal = (dish) => {
        setEditingDish(dish);
        setModalVisible(true);
    };

    const handleModalCancel = () => {
        setEditingDish(null);
        setModalVisible(false);
    };

    useEffect(() => {
        setLoading(true);
        getOrders().then((res) => {
            setDataSource(res);
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
            title: "Description",
            dataIndex: "description",
        },
        {
            title: "Price",
            dataIndex: "price",
        },
        {
            title: "Availability",
            dataIndex: "availability",
            render: (availability) => (
                <>
                    {availability ? (
                        <Tag color={"green"}>YES</Tag>
                    ) : (
                        <Tag color={"red"}>NO</Tag>
                    )}
                </>
            ),
        },
        {
            title: "Action",
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={() => showEditModal(record)}>Edit</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Table
                columns={columns}
                loading={loading}
                dataSource={dataSource.map((dish: Dish) => ({
                    ...dish,
                    key: dish.dishId.toString(),
                }))}
            />

            <Modal
                title="Edit Dish"
                visible={modalVisible}
                onCancel={handleModalCancel}
                footer={null}
            >
                <DishEditForm
                    dish={editingDish}
                    onCancel={handleModalCancel}
                    onFinish={() => {
                        // Handle form submission and update the dish data
                        // You can add your logic here
                        handleModalCancel();
                    }}
                />
            </Modal>
        </div>
    );
}

function DishEditForm({ dish, onCancel, onFinish }) {
    const [form] = Form.useForm();

    useEffect(() => {
        if (dish) {
            form.setFieldsValue(dish);
        }
    }, [dish, form]);

    const handleSubmit = () => {
        form
            .validateFields()
            .then((values) => {
                // Handle form submission and update the dish data
                // You can add your logic here
                onFinish();
            })
            .catch((errorInfo) => {
                console.log("Validation failed:", errorInfo);
            });
    };

    return (
        <Form form={form} onFinish={handleSubmit}>
            <Form.Item
                name="name"
                label="Name"
                rules={[
                    {
                        required: true,
                        message: "Please enter the dish name",
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="price"
                label="Price"
                rules={[
                    {
                        required: true,
                        type: "number",
                        min: 0,
                        message: "Please enter a valid price",
                    },
                ]}
            >
                <Input type="number" />
            </Form.Item>

            {/* Add more form fields for editing other properties of the dish */}

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Save
                </Button>
                <Button onClick={onCancel}>Cancel</Button>
            </Form.Item>
        </Form>
    );
}

export default Dishes;
