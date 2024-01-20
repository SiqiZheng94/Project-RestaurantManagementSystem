import { Space } from "antd";
import "./App.css";

import AppHeader from "./components/AppHeader";
import PageContent from "./components/PageContent";
import SideMenu from "./components/SideMenu";
import AppFooter from "./components/AppFooter";
import {Route, Routes} from "react-router-dom";
import Dashboard from "./pages/Dashboard.tsx";
import Inventory from "./pages/Inventory.tsx";
import Orders from "./pages/Orders.tsx";
import Customers from "./pages/Customers.tsx";
import MenuManagement from "./pages/MenuManagement.tsx";
import MenuOrdering from "./pages/MenuOrdering.tsx";


function App() {


  return (
    <div className={"App"}>
      <AppHeader />
      <Space className={"SideMenuAndPageContent"}>
        <SideMenu></SideMenu>
        {/*<PageContent></PageContent>*/}
        <Routes>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="/inventory" element={<Inventory />}></Route>
            <Route path="/orders" element={<Orders />}></Route>
            <Route path="/customers" element={<Customers />}></Route>
            <Route path="/menu-management" element={<MenuManagement />}></Route>
            <Route path="/menu-ordering" element={<MenuOrdering />}></Route>
        </Routes>
      </Space>
      <AppFooter />
    </div>
  )
}


export default App
