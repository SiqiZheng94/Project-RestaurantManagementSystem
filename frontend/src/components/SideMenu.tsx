import {
    AppstoreOutlined,
    ShopOutlined,
    ShoppingCartOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import Login from "../pages/Login.tsx";

function SideMenu() {
    const navigate = useNavigate();
    return (
        <div className={"SideMenu"}>
            <Menu
                style={{ height: "100vh" }}
                onClick={(item)=>{
                    //item.key
                    navigate(item.key);
                }}
                items={[
                    {
                        label: "Dashboard",
                        icon: <AppstoreOutlined />,
                        key: '/dashboard',
                    },
                    {
                        label: "Admin Login",
                        icon: <UserOutlined />,
                        key: '/login',
                    },
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
                    {
                        label: "Menu Ordering",
                        icon: <ShopOutlined />,
                        key: '/menu-ordering',
                    },
                    {
                        label: "Cart",
                        icon: <ShoppingCartOutlined />,
                        key: '/cart',
                    },
                ]

                }
            ></Menu>
        </div>
    )
}
export default SideMenu;