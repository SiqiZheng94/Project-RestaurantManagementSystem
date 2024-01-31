import {
    ReadOutlined,
    ShopOutlined,
    ShoppingCartOutlined,
    SolutionOutlined,
    TeamOutlined,
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
                        label: "Customer",
                        icon: <ShopOutlined />,
                        key: 'customer',
                        children: [
                            {
                                label: "Menu",
                                icon: <ReadOutlined />,
                                key: '/menu-ordering',
                            },
                            {
                                label: "Cart",
                                icon: <ShoppingCartOutlined />,
                                key: '/cart',
                            },
                        ]
                    },{
                        label: "Admin",
                        icon: <TeamOutlined />,
                        key: 'admin',
                        children: [
                            {
                                label: "Admin Login",
                                icon: <UserOutlined />,
                                key: '/login',
                            },
                            {
                                label: "Dashboard",
                                icon: <ReadOutlined />,
                                key: '/dashboard',
                            },
                            {
                                label: "Menu Management",
                                icon: <SolutionOutlined />,
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
