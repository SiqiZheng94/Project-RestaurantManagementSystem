import {
    AppstoreOutlined,
    ShopOutlined,
    ShoppingCartOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SideMenu() {
    const navigate = useNavigate();
    return (
        <div className={"SideMenu"}>
            <Menu
                onClick={(item)=>{
                    //item.key
                    navigate(item.key);
                }}
                items={[
                    {
                        label: "Dashboard",
                        icon: <AppstoreOutlined />,
                        key: '/',
                    },
                    {
                        label: "Inventory",
                        icon: <ShopOutlined />,
                        key: '/inventory',
                    },
                    {
                        label: "Orders",
                        icon: <ShoppingCartOutlined />,
                        key: '/orders',
                    },
                    {
                        label: "Customers",
                        icon: <UserOutlined />,
                        key: '/customers',
                    }
                ]

                }
            ></Menu>
        </div>
    )
    // const location = useLocation();
    // const [selectedKeys, setSelectedKeys] = useState("/");
    //
    // useEffect(() => {
    //     const pathName = location.pathname;
    //     setSelectedKeys(pathName);
    // }, [location.pathname]);
    //
    // const navigate = useNavigate();
    // return (
    //     <div className="SideMenu">
    //         <Menu
    //             className="SideMenuVertical"
    //             mode="vertical"
    //             onClick={(item) => {
    //                 //item.key
    //                 navigate(item.key);
    //             }}
    //             selectedKeys={[selectedKeys]}
    //             items={[
    //                 {
    //                     label: "Dashbaord",
    //                     icon: <AppstoreOutlined />,
    //                     key: "/",
    //                 },
    //                 {
    //                     label: "Inventory",
    //                     key: "/inventory",
    //                     icon: <ShopOutlined />,
    //                 },
    //                 {
    //                     label: "Orders",
    //                     key: "/orders",
    //                     icon: <ShoppingCartOutlined />,
    //                 },
    //                 {
    //                     label: "Customers",
    //                     key: "/customers",
    //                     icon: <UserOutlined />,
    //                 },
    //             ]}
    //         ></Menu>
    //     </div>
    // );
}
export default SideMenu;