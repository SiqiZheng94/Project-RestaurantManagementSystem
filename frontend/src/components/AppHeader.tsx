import { Image, Typography } from "antd";
import myImage from "../assets/logo-header2.jpg";
function AppHeader() {


    return (
        <div className="AppHeader">
            <Image
                height={70}
                src={myImage}
            ></Image>
            <Typography.Title>Restaurant</Typography.Title>

        </div>
    );
}
export default AppHeader;