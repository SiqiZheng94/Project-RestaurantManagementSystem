import { useEffect, useState } from "react";
import { getAllDishes } from "../API";
import { Space, Table, Tag, Modal, Form, Input, Button, Switch } from "antd";
import { Dish } from "../entity/Dish.ts";

function Dishes() {
    const [dataSource, setDataSource] = useState<Dish[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [editingDish, setEditingDish] = useState<Dish | null>(null);

    const showEditModal = (dish: Dish) => {
        setEditingDish(dish);
        setModalVisible(true);
    };

    const handleModalCancel = () => {
        setEditingDish(null);
        setModalVisible(false);
    };

    useEffect(() => {
        setLoading(true);
        getAllDishes().then((res: Dish[]) => {
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
            render: (availability: boolean) => (
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
            render: (text: string, record: Dish) => (
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
                dataSource={dataSource.map((dish) => ({
                    ...dish,
                    key: dish.dishId.toString(),
                }))}
            />

            <Modal
                title="Edit Dish"
                open={modalVisible}
                onCancel={handleModalCancel}
                footer={null}
            >
                <DishEditForm
                    dish={editingDish}
                    onCancel={handleModalCancel}
                    onFinish={() => {
                        // Handle form submission and update the dish data
                        // add your logic here
                        handleModalCancel();
                    }}
                />
            </Modal>
        </div>
    );
}

function DishEditForm({ dish, onCancel, onFinish }: any) {
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
                name="category"
                label="Category"
                rules={[
                    {
                        required: true,
                        message: "Please enter the category",
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="description"
                label="Description"
                rules={[
                    {
                        required: true,
                        message: "Please enter the description",
                    },
                ]}
            >
                <Input.TextArea />
            </Form.Item>

            <Form.Item
                name="price"
                label="Price"
                rules={[
                    {
                        required: true,
                        type: "number",
                        min: 0,
                        // Convert input values to floating point numbers
                        transform: (value) => parseFloat(value),
                        message: "Please enter a valid price",
                    },
                ]}
            >
                <Input type="number" step="0.01" />
            </Form.Item>

            <Form.Item name="vegetarian" label="Vegetarian" valuePropName="checked">
                <Switch />
            </Form.Item>

            <Form.Item name="availability" label="Availability" valuePropName="checked">
                <Switch />
            </Form.Item>

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
