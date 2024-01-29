import { Space } from "antd";
import "./App.css";

import AppHeader from "./components/AppHeader.tsx";
import SideMenu from "./components/SideMenu.tsx";
import AppFooter from "./components/AppFooter.tsx";
import {Route, Routes} from "react-router-dom";
import Dashboard from "./pages/Dashboard.tsx";
import Inventory from "./pages/Inventory.tsx";
import Orders from "./pages/Orders.tsx";
import Customers from "./pages/Customers.tsx";
import MenuManagement from "./pages/MenuManagement.tsx";
import MenuOrdering from "./pages/MenuOrdering.tsx";
import {useEffect, useState} from "react";
import {Dish} from "./model/Dish.ts";
import {getAllDishesApi} from "./API";
import Home from "./pages/Home.tsx";
import Cart from "./pages/Cart.tsx";
import Login from "./pages/Login.tsx";
import AuthGuard from "./components/AuthGuard.tsx";



function App() {
    const [dataSource, setDataSource] = useState<Dish[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchData = () => {
        getAllDishesApi()
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
        fetchData();
    }, []);

  return (
    <div className={"App"}>
      <AppHeader />
      <Space className={"SideMenuAndPageContent"}>
        <SideMenu></SideMenu>

        <Routes>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/orders" element={<Orders />}></Route>
            <Route path="/menu-management" element={<MenuManagement />}></Route>
            <Route path="/menu-ordering" element={<MenuOrdering  dishes={dataSource} />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
        </Routes>
      </Space>
      <AppFooter />
    </div>
  )
}


export default App
