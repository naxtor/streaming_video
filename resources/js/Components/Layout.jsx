import React, { useEffect } from "react";
import { Link } from "@inertiajs/inertia-react";
import { Layout as Wrapper, Menu } from "antd";

const { Header, Footer } = Wrapper;

export default function Layout({ App, props }) {
    return (
        <Wrapper className="layout">
            <Header style={{backgroundColor: '#00AFF0'}}>
                <Menu
                    className="menu"
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={["/"]}
                    items={[
                        {
                            label: <Link href="/">Videos</Link>,
                            key: "/",
                        },
                        {
                            label: <Link href="/upload">Upload</Link>,
                            key: "/upload",
                        },
                    ]}
                ></Menu>
            </Header>
            <div style={{ minHeight: "70vh" }}>
                <App {...props} />
            </div>
            <Footer className="footer">
                <span>Binus ©2023 Created by Team 4</span>
            </Footer>
        </Wrapper>
    );
}
