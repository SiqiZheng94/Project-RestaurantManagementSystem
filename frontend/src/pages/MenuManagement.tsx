import { useEffect, useState } from "react";
import {
    createNewDishApi,
    deleteThisDishApi,
    getAllDishesApi,
    getAllFilteredDishesApi,
    updateThisDishApi
} from "../API";
import {Space, Table, Tag, Modal, Button, Select} from "antd";
import { Dish } from "../model/Dish.ts";
import {DishDTO} from "../model/DishDTO.ts";
import DishForm from "../components/DishForm.tsx";




export default function MenuManagement() {
    const [dataSource, setDataSource] = useState<Dish[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
    const [editingDish, setEditingDish] = useState<Dish | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedAvailability, setSelectedAvailability] = useState<boolean | null>(null);
    const [addModalVisible, setAddModalVisible] = useState<boolean>(false);

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
            })
            .catch((error) => {
                console.error("Error creating new dish:", error);
            });
        handleAddModalCancel();
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
            });
        handleModalCancel();
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
                        <Tag color={"green"}>Yes</Tag>
                    ) : (
                        <Tag color={"red"}>No</Tag>
                    )}
                </>
            ),
        },
        {
            title: "Action",
            render: (record: Dish) => (
                <Space size="middle">
                    <Button onClick={() => showEditModal(record)}>Edit</Button>
                    <Button onClick={() => deleteThisItem(record._id)}>Delete</Button>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <div className="MultipleElementsInaRow" style={{ marginBottom: 16 }}>
                <div>
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
                </div>
                <Button className="submit-button" type="primary" onClick={showAddModal}>+ New Dish</Button>
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
                <DishForm
                    dish={editingDish}
                    onCancel={handleModalCancel}
                    onFinish={(values) => {
                        if (editingDish) {
                            updateThisItem(editingDish._id, values);
                        }
                    }}
                />
            </Modal>

            <Modal
                title="Add New Dish"
                open={addModalVisible}
                onCancel={handleAddModalCancel}
                footer={null}
            >
                <DishForm
                    onCancel={handleAddModalCancel}
                    onFinish={(values) => {
                        createNewDish(values);
                    }}
                />
            </Modal>

        </div>
    );
}