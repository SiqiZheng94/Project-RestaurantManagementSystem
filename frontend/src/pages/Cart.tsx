import {Button, InputNumber, Select, Space, Table, Tag, Typography} from "antd";
import {DishInCart} from "../model/DishInCart.ts";
import {useEffect, useState} from "react";
import {
    changeQuantityApi,
    creatOrderAndLeerCartApi,
    deleteDishInCartApi,
    getAllDishesApi,
    getAllDishesInCartApi
} from "../API";
import {DishInCartDTO} from "../model/DishInCartDTO.ts";

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
                setLoading(false);
            })
    }

    function handleQuantityChange(id: number, newAmount: number) {
        const dishInCartDto: DishInCartDTO = {
            dishId: id,
            amount: newAmount,
        };

        changeQuantityApi(dishInCartDto)
            .then((response) => {
                    // 更新dataSource中的数量
                    const updatedDataSource = dataSource.map((dishInCartDto) => {
                        if (dishInCartDto.dishId === id) {
                            return {
                                ...dishInCartDto,
                                amount: newAmount,
                                totalPrice: dishInCartDto.onePiecePrice * newAmount,
                            };
                        }
                        return dishInCartDto;
                    });

                    // 设置新的dataSource
                    setDataSource(updatedDataSource);
            })
            .catch((error) => {
                console.error("Error updating quantity:", error);
            });
    }

    async function creatOrderAndLeerCart() {
        try {
            // 执行支付逻辑，并等待完成
            await creatOrderAndLeerCartApi();

            // 更新数据源或重新加载数据
            const response = await getAllDishesInCartApi();
            setDataSource(response.data);

        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    }

    // 计算总和函数
    function calculateTotalAmount() {
        let total = 0;
        for (const dish of dataSource) {
            total += parseFloat(dish.totalPrice);
        }
        return total.toFixed(2);
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
                onChange={(newAmount) => handleQuantityChange(record.dishId, newAmount)}
            />
        ),
    },
    {
        title: "Total Amount",
        dataIndex: "totalPrice",
        render: (text, record) => (
            <span>{parseFloat(record.totalPrice).toFixed(2)}</span>
        ),
    },
    {
        title: "Action",
        render: (record: DishInCart) => (
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
            <div className="MultipleElementsInaRow">
                <Typography.Title level={5}>Total: {calculateTotalAmount()}€</Typography.Title>
                <Button className="submit-button" onClick={() => creatOrderAndLeerCart()}>Payment</Button>
            </div>

        </>

    )
}