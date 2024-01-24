// import {Button, Select, Space, Table, Tag, Typography} from "antd";
// import {DishInCart} from "../model/DishInCart.ts";
// import {useEffect, useState} from "react";
// import {getAllDishesApi, getAllDishesInCartApi} from "../API";
//
// export default function Cart(){
//     const [dataSource, setDataSource] = useState<DishInCart[]>([]);
//     const [loading, setLoading] = useState<boolean>(false);
//
//     useEffect(() => {
//         setLoading(true);
//         getAllDishesInCartApi()
//             .then(response => {
//                 setDataSource(response.data);
//                 setLoading(false);
//             })
//             .catch((error) => {
//                 console.error("Error fetching data:", error);
//                 setLoading(false);
//             });
//     }, []);
//
//     const columns = [
//     {
//         title: "Name",
//         dataIndex: "name",
//     },
//     {
//         title: "Description",
//         dataIndex: "description",
//     },
//     {
//         title: "Quantity",
//         dataIndex: "amount",
//     },
//     {
//         title: "Total Amount",
//         dataIndex: "totalPrice",
//     },
//     {
//         title: "Action",
//         render: (text: string, record: DishInCart) => (
//             <Space size="middle">
//                 <Button >Delete</Button>
//             </Space>
//         ),
//     },
// ];
//
//     return (
//         <>
//             <Typography.Title level={4}>Cart</Typography.Title>
//             <Table
//                 columns={columns}
//                 loading={loading}
//                 dataSource={dataSource.map((dish) => ({
//                     ...dish,
//                     key: dish.dishId.toString(),
//                 }))}
//             />
//         </>
//
//     )
// }