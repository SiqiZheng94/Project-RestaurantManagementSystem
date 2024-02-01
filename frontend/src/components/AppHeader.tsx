import { Typography } from "antd";
import myImage from "../assets/logo-header2.jpg";
import {useNavigate} from "react-router-dom";
function AppHeader() {
    const navigate = useNavigate();
    const openHomePage = ()=>{
        navigate("/");
    }

    return (
        <div className="AppHeader">
            <img
                height={70}
                src={myImage}
                onClick={()=>openHomePage}
                alt={"logo"}>
            </img>

            <Typography.Title className="centeredTitle">Sushi Restaurant</Typography.Title>

        </div>
    );
}
export default AppHeader;