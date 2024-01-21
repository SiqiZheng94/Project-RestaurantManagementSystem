import {Button} from "antd";
import {useNavigate} from "react-router-dom";
var navigate = useNavigate();
const openAdminDashboard = ()=>{
    navigate("/admin");
}
const openUserDashboard = ()=>{
    navigate("/menu-ordering");
}
export default function Home(){
    return(
        <div>
            <Button onClick={openAdminDashboard}></Button>
            <Button onClick={openUserDashboard}></Button>
        </div>
    )
}