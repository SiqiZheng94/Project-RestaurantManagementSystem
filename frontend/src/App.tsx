import { Space } from "antd";
import "./App.css";

import AppHeader from "./components/AppHeader.tsx";
import SideMenu from "./components/SideMenu.tsx";
import AppFooter from "./components/AppFooter.tsx";
import {Route, Routes, useNavigate} from "react-router-dom";
import Dashboard from "./pages/Dashboard.tsx";
import Orders from "./pages/Orders.tsx";
import MenuManagement from "./pages/MenuManagement.tsx";
import MenuOrdering from "./pages/MenuOrdering.tsx";
import {useEffect, useState} from "react";
import {Dish} from "./model/Dish.ts";
import {getAllDishesApi} from "./API";
import Cart from "./pages/Cart.tsx";
import Login from "./pages/Login.tsx";
import AuthGuard from "./components/AuthGuard.tsx";
import axios from "axios";




function App() {
    const [dataSource, setDataSource] = useState<Dish[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined)
    const navigate = useNavigate();

    const fetchData = () => {
        getAllDishesApi()
            .then(response => {
                setDataSource(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }

    const checkToken = () => {
        const token = localStorage.getItem('token');

        if (token) {
            axios.get('api/admin/check-token', {
                headers: {
                    'token' : token
                }
            })
                .then(response => {
                    if (response.data) {
                        setIsLoggedIn(true);
                        navigate("/dashboard");
                    } else {
                        setIsLoggedIn(false);
                    }
                })
                .catch(error => {
                    console.error('Error checking token:', error);
                    setIsLoggedIn(false);
                });
        } else {
            setIsLoggedIn(false);
        }
    }



    useEffect(() => {
        checkToken();
        fetchData();
    }, [isLoggedIn]);


  return (
    <div className={"App"}>
      <AppHeader />
      <Space className={"SideMenuAndPageContent"}>
        <SideMenu></SideMenu>

        <Routes>
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>}></Route>


            <Route path="/dashboard" element={<AuthGuard isAuthenticated={isLoggedIn}><Dashboard /></AuthGuard>} />
            <Route path="/orders" element={<AuthGuard isAuthenticated={isLoggedIn}><Orders  /></AuthGuard>} />
            <Route path="/menu-management" element={<AuthGuard isAuthenticated={isLoggedIn}><MenuManagement /></AuthGuard>} />

            <Route path="/menu-ordering" element={<MenuOrdering  dishes={dataSource} />}></Route>
            <Route path="/cart" element={<Cart />}></Route>

        </Routes>
      </Space>
      <AppFooter />
    </div>
  )
}


export default App
