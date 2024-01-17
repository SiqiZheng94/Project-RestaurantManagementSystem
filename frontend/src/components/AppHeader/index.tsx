import { Image, Typography } from "antd";
import myImage from "../../assets/logo-header.jpeg";
function AppHeader() {


    return (
        <div className="AppHeader">
            <Image
                width={137}
                src={myImage}
            ></Image>
            <Typography.Title>Management System</Typography.Title>

        </div>
    );
}
export default AppHeader;