import { Space } from "antd";
import "./App.css";

import AppHeader from "./components/AppHeader";
import SideMenu from "./components/SideMenu";
import AppFooter from "./components/AppFooter";
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
            <Route path="/admin" element={<Dashboard />}></Route>
            <Route path="/inventory" element={<Inventory />}></Route>
            <Route path="/orders" element={<Orders />}></Route>
            <Route path="/customers" element={<Customers />}></Route>
            <Route path="/menu-management" element={<MenuManagement />}></Route>
            <Route path="/menu-ordering" element={<MenuOrdering  dishes={dataSource} />}></Route>
            <Route path="/" element={<Home/>}></Route>

        </Routes>
      </Space>
      <AppFooter />
    </div>
  )
}


export default App
