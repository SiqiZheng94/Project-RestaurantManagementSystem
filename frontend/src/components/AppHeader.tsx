import { Typography } from "antd";
import myImage from "../assets/logo-header2.jpg";
import {useNavigate} from "react-router-dom";
function AppHeader() {
    const navigate = useNavigate();
    function openHomePage (){
        navigate("/");
    }

    return (
        <div className="AppHeader">
            <div
                onClick={openHomePage}
                onKeyDown={() => {}}
                role="button"
                tabIndex={0}
            >
                <img
                    height={70}
                    src={myImage}
                    alt="logo"
                    style={{ cursor: "pointer" }}
                />
            </div>

            <Typography.Title className="centeredTitle">Sushi Restaurant</Typography.Title>

        </div>
    );
}
export default AppHeader;