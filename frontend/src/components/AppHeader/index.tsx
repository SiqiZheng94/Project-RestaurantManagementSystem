import { Image, Typography } from "antd";

function AppHeader() {


    return (
        <div className="AppHeader">
            <Image
                width={40}
                src="https://yt3.ggpht.com/ytc/AMLnZu83ghQ28n1SqADR-RbI2BGYTrqqThAtJbfv9jcq=s176-c-k-c0x00ffffff-no-rj"
            ></Image>
            <Typography.Title>Management System</Typography.Title>

        </div>
    );
}
export default AppHeader;