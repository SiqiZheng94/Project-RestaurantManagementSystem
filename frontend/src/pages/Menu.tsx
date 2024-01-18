import { useEffect, useState } from "react";
import {
    createNewDishApi,
    deleteThisDishApi,
    getAllDishesApi,
    getAllFilteredDishesApi,
    updateThisDishApi
} from "../API";
import {Space, Table, Tag, Modal, Button, Select, Form, Input, Switch} from "antd";
import { Dish } from "../model/Dish.ts";
import DishEditForm from "../components/MenuPage/DishEditForm.tsx";
import {DishDTO} from "../model/DishDTO.ts";




export default function Menu() {
    const [dataSource, setDataSource] = useState<Dish[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
    const [editingDish, setEditingDish] = useState<Dish | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedAvailability, setSelectedAvailability] = useState<boolean | null>(null);
    const [addModalVisible, setAddModalVisible] = useState<boolean>(false);
    const [form] = Form.useForm();
    const showEditModal = (dish: Dish) => {
        setEditingDish(dish);
        setEditModalVisible(true);
    };

    const handleModalCancel = () => {
        setEditingDish(null);
        setEditModalVisible(false);
    };

    function showAddModal() {
        setAddModalVisible(true);
        form.resetFields();
    }

    const handleAddModalCancel = () => {
        setAddModalVisible(false);
    };

    function deleteThisItem(id: string) {
        // all dishes without the deleted one
        const updatedDishes = dataSource.filter(dish=> dish._id !== id);
        setDataSource(updatedDishes);

        deleteThisDishApi(id)
            .catch((error) => {
                    console.error("Error fetching data:", error);
                    setLoading(false);
            });
    }

    function createNewDish(newDishDto: DishDTO){
        createNewDishApi(newDishDto)
            .then((response)=>{
                const newDish = response.data;
                setDataSource([...dataSource, newDish]);
                handleAddModalCancel();
            })
            .catch((error) => {
                console.error("Error creating new dish:", error);
            });
    }

    function updateThisItem(id:string, updatedDishDto:DishDTO){
        // Update dataSource immediately
        const updatedDishes = dataSource.map((dish) => {
            if (dish._id === id) {
                return { ...dish, ...updatedDishDto };
            }
            return dish;
        });
        setDataSource(updatedDishes);

        // Send the request
        updateThisDishApi(id, updatedDishDto)
            .then(response=> response.data)
            .catch(error => {
                console.error("Error fetching data:", error);
            })
    }

    function handleSearch(){
        setLoading(true);
        const params: any = {};
        if (selectedCategory) {
            params.category = selectedCategory;
        }
        if (selectedAvailability !== null){
            params.availability = selectedAvailability;
        }
        getAllFilteredDishesApi(params)
            .then(response => {
                setDataSource(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }


    useEffect(() => {
        setLoading(true);
        getAllDishesApi()
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
                    <Button onClick={() => showEditModal(record)}>Edit</Button>
                    <Button onClick={() => deleteThisItem(record._id)}>Delete</Button>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <div style={{ marginBottom: 16 }}>
                Category:
                <Select
                    style={{ width: 200, marginRight: 16 }}
                    placeholder="Select Category"
                    onChange={(value) => setSelectedCategory(value)}
                    allowClear
                >
                        <Select.Option value="SIDE_DISHES">SIDE_DISHES</Select.Option>
                        <Select.Option value="MAKI_ROLLS">MAKI_ROLLS</Select.Option>
                        <Select.Option value="NIGIRI_GUNKAN">NIGIRI_GUNKAN</Select.Option>
                        <Select.Option value="TEMAKI">TEMAKI</Select.Option>
                        <Select.Option value="YAKI_VEGGIE">YAKI_VEGGIE</Select.Option>
                        <Select.Option value="FRY">FRY</Select.Option>
                        <Select.Option value="DRINK">DRINK</Select.Option>
                </Select>
                Availability:
                <Select
                    style={{ width: 100, marginRight: 16 }}
                    placeholder="Select"
                    onChange={(value) => setSelectedAvailability(value)}
                    allowClear
                >
                        <Select.Option value={true}>Yes</Select.Option>
                        <Select.Option value={false}>No</Select.Option>
                </Select>
                <Button onClick={handleSearch}>Search</Button>
                <Button onClick={showAddModal}>+ New Dish</Button>
            </div>

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
                open={editModalVisible}
                onCancel={handleModalCancel}
                footer={null}
            >
                <DishEditForm
                    dish={editingDish}
                    onCancel={handleModalCancel}
                    onFinish={handleModalCancel}
                    // Pass the updateThisItem function as a prop
                    updateThisItem={updateThisItem}
                />
            </Modal>
//==================================
            // 示例 Modal 组件
            <Modal
                title="Add New Dish"
                open={addModalVisible}
                onCancel={handleAddModalCancel}
                footer={null}
            >
                {/* 表单字段 */}
                <Form
                    form={form}
                    onFinish={(values) => {createNewDish(values);}}
                >
                    {/* 表单字段 */}

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
                            <Select>
                                <Select.Option value="SIDE_DISHES">SIDE_DISHES</Select.Option>
                                <Select.Option value="MAKI_ROLLS">MAKI_ROLLS</Select.Option>
                                <Select.Option value="NIGIRI_GUNKAN">NIGIRI_GUNKAN</Select.Option>
                                <Select.Option value="TEMAKI">TEMAKI</Select.Option>
                                <Select.Option value="YAKI_VEGGIE">YAKI_VEGGIE</Select.Option>
                                <Select.Option value="FRY">FRY</Select.Option>
                                <Select.Option value="DRINK">DRINK</Select.Option>
                            </Select>
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
                            <Button onClick={handleAddModalCancel}>Cancel</Button>
                        </Form.Item>

                </Form>
            </Modal>
//==================================
        </div>
    );
}