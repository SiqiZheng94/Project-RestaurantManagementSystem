import {Button, Typography} from "antd";
import {useNavigate} from "react-router-dom";
export default function Home(){
    const navigate = useNavigate();
    const openAdminDashboard = ()=>{
        navigate("/login");
    }
    const openUserDashboard = ()=>{
        navigate("/menu-ordering");
    }


    return(
        <div className="home-container">
            <Typography.Title level={1} style={{
                fontFamily: "cursive", // 选择漂亮的字体
                fontSize: "7rem", // 增加字体大小
                color: "#fff"
            }}>Welcome!</Typography.Title>
            <div>
                <Button onClick={openAdminDashboard} >Admin</Button>
                <Button onClick={openUserDashboard} >Customer</Button>
            </div>
        </div>

    )
}