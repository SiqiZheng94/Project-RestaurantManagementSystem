import {Button} from "antd";
import {useNavigate} from "react-router-dom";
export default function Home(){
    const navigate = useNavigate();
    const openAdminDashboard = ()=>{
        navigate("/admin");
    }
    const openUserDashboard = ()=>{
        navigate("/menu-ordering");
    }
    return(
        <div>
            <Button onClick={openAdminDashboard}>Admin</Button>
            <Button onClick={openUserDashboard}>User</Button>
        </div>
    )
}