import {
    MenuOutlined,
    ReadOutlined,
    ShopOutlined,
    ShoppingCartOutlined,
    SolutionOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";



function SideMenu() {
    const navigate = useNavigate();
    return (

            <Menu
                style={{ height: "73vh" }}
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
                        icon: <UserOutlined />,
                        key: 'admin',
                        children: [
                            // {
                            //     label: "Dashboard",
                            //     icon: <ReadOutlined />,
                            //     key: '/dashboard',
                            // },
                            {
                                label: "Menu Management",
                                icon: <MenuOutlined />,
                                key: '/menu-management',
                            },
                            {
                                label: "Orders management",
                                icon: <SolutionOutlined />,
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
