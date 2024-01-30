import { Typography } from "antd";
import React from "react";
import {GithubOutlined, LinkedinOutlined} from "@ant-design/icons";

function AppFooter() {
    return (
        <div className="AppFooter">
            <div className="footer-section f1">
                <p className="title">OPENING HOURS</p>
                <table>
                    <tbody>
                    <tr>
                        <td>Mon - Thu</td>
                        <td>11:00 am - 10:00 pm</td>
                    </tr>
                    <tr>
                        <td>Fri - Sat</td>
                        <td>11:00 am - 12:00 pm</td>
                    </tr>
                    <tr>
                        <td>Sunday</td>
                        <td>Closed</td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div className="footer-section f2">
                <p className="title">CONTACT</p>
                <p>info@example.com</p>
                <p>+01 234 567 88</p>
                <p>45884 Gelsenkirchen</p>
            </div>
            <div className="footer-section f3">
                <p className="title">SOCIALS</p>
                <p>
                    <GithubOutlined />
                    <span> </span>
                    <a href={"https://github.com/SiqiZheng94/siqizheng-OrderingSystem"}>Github</a>
                </p>
                <p>
                    <LinkedinOutlined />
                    <span> </span>
                    <a href={"https://www.linkedin.com/in/zhengsiqi/"}>Linkedin</a>
                </p>
                <p>&copy; 2024 Copyright: siqizheng.de </p>
            </div>
        </div>
    );
}
export default AppFooter;