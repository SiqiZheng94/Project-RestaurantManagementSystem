// import {
//     AppstoreOutlined,
//     ShopOutlined,
//     ShoppingCartOutlined,
//     UserOutlined,
// } from "@ant-design/icons";
// import { Menu } from "antd";
// import { useNavigate } from "react-router-dom";
//
//
//
// function SideMenu() {
//     const navigate = useNavigate();
//     return (
//         <div className={"SideMenu"}>
//             <Menu
//                 style={{ height: "100vh" }}
//                 onClick={(item)=>{
//                     //item.key
//                     navigate(item.key);
//                 }}
//                 items={[
//                     {
//                         label: "Menu",
//                         icon: <ShopOutlined />,
//                         key: '/menu-ordering',
//                     },
//                     {
//                         label: "Cart",
//                         icon: <ShoppingCartOutlined />,
//                         key: '/cart',
//                     },
//                     {
//                         label: "Admin Login",
//                         icon: <UserOutlined />,
//                         key: '/login',
//                     },
//                     {
//                         label: "Dashboard",
//                         icon: <AppstoreOutlined />,
//                         key: '/dashboard',
//                     },
//                     {
//                         label: "Menu Management",
//                         icon: <ShopOutlined />,
//                         key: '/menu-management',
//                     },
//                     {
//                         label: "Orders",
//                         icon: <ShoppingCartOutlined />,
//                         key: '/orders',
//                     },
//
//                 ]
//
//                 }
//             ></Menu>
//         </div>
//     )
// }
//
//
// export default SideMenu;

import {
    AppstoreOutlined,
    ShopOutlined,
    ShoppingCartOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";



function SideMenu() {
    const navigate = useNavigate();
    return (

            <Menu
                style={{ height: "100vh" }}
                onClick={(item)=>{
                    //item.key
                    navigate(item.key);
                }}
                mode="vertical"
                items={[
                    {
                        label: "customer",
                        icon: <ShopOutlined />,
                        key: 'customer',
                        children: [
                            {
                                label: "Menu",
                                icon: <ShopOutlined />,
                                key: '/menu-ordering',
                            },
                            {
                                label: "Cart",
                                icon: <ShoppingCartOutlined />,
                                key: '/cart',
                            },
                        ]
                    },{
                        label: "admin",
                        icon: <ShopOutlined />,
                        key: 'admin',
                        children: [
                            {
                                label: "Admin Login",
                                icon: <UserOutlined />,
                                key: '/login',
                            },
                            // {
                            //     label: "Dashboard",
                            //     icon: <AppstoreOutlined />,
                            //     key: '/dashboard',
                            // },
                            {
                                label: "Menu Management",
                                icon: <ShopOutlined />,
                                key: '/menu-management',
                            },
                            {
                                label: "Orders",
                                icon: <ShoppingCartOutlined />,
                                key: '/orders',
                            },
                        ]
                    },



                ]

                }
            ></Menu>

    )
}


export default SideMenu;
