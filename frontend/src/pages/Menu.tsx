import { useEffect, useState } from "react";
import {deleteThisDishApi, getAllDishesApi, getAllFilteredDishesApi, updateThisDishApi} from "../API";
import {Space, Table, Tag, Modal, Button, Select} from "antd";
import { Dish } from "../model/Dish.ts";
import DishEditForm from "../components/MenuPage/DishEditForm.tsx";




export default function Menu() {
    const [dataSource, setDataSource] = useState<Dish[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [editingDish, setEditingDish] = useState<Dish | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedAvailability, setSelectedAvailability] = useState<boolean | null>(null);


    const showEditModal = (dish: Dish) => {
        setEditingDish(dish);
        setModalVisible(true);
    };

    const handleModalCancel = () => {
        setEditingDish(null);
        setModalVisible(false);
    };

    function openModal() {
        setModalVisible(true);
    }



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

    function updateThisItem(selectedDish: Dish){
        updateThisDishApi(selectedDish)
            .then(() => {
                // update the datasource
                const  updatedDishes = dataSource.map((dish) => {
                    // find the selected item and return the updated one
                    if (dish._id === selectedDish._id) {
                        return selectedDish;
                    }
                    return dish;
                });
                setDataSource(updatedDishes);
            })
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
            .then((res: Dish[])=> {
                setDataSource(res);
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
            .then((res: Dish[]) => {
                setDataSource(res);
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
                <Button onClick={openModal}>+ New Dish</Button>
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
                open={modalVisible}
                onCancel={handleModalCancel}
                footer={null}
            >
                <DishEditForm
                    dish={editingDish}
                    onCancel={handleModalCancel}
                    onFinish={() => {

                        handleModalCancel();
                    }}
                    // Pass the updateThisItem function as a prop
                    updateThisItem={updateThisItem}
                />
            </Modal>

        </div>
    );
}