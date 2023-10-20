import React, { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import logo from "../assets/logo.png"
import {
  Avatar,
  Button,
  Col,
  Segmented,
  Dropdown,
  Layout,
  MenuProps,
  Row,
  Space,
  theme,
} from "antd";
import Report from "../pages/report";
import Image from "next/image";
import Head from "next/head";
import { BarChartOutlined, FileTextOutlined } from "@ant-design/icons";
import Analytics from "@/pages/analytics";
import Footer from "./Footer";

const { Header, Content } = Layout;

const Home: React.FC = () => {
  const user = useUser();
  const [SelectedMenu, setSelectedMenu] = useState('Reports')
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Fetch existing user data
        const getUserResponse = await fetch("/api/user/get", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: user.user?.sub,
          }),
        });

        if (getUserResponse.ok) {
          const data = await getUserResponse.json();
          if (!data.found) {
            createUser();
          }
        } else {
          console.error("Error:", getUserResponse.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const createUser = async () => {
      try {
        const createUserResponse = await fetch(
          "/api/user/create",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: user.user?.sub,
              name: user.user?.nickname,
            }),
          }
        );
        if (!createUserResponse.ok) {
          console.error("Error:", createUserResponse.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchUser();
  }, [user]);

  const items: MenuProps["items"] = [
    {
      key: "2",
      label: (
        <Button type="primary" danger style={{ width: "100%" }}>
          <a href="/api/auth/logout">Logout</a>
        </Button>
      ),
    },
  ];

  return (
    <>
    <Head>
      <title>Injury Tracking System</title>
    </Head>
     
    <Layout className="layout">
      <Header className="header sticky top-0 z-10 bg-darkwhite2">
        <Row>
          <Col span={2}>
          <a href="/">
          <Image src={logo} alt="logo"  className="md:cursor-pointer  w-auto h-auto ml-2 mt-5 scale-100" /></a>
          </Col>
          <Col span={22}>
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
              }}
            >
              <Dropdown menu={{ items }} placement="bottomRight" className="float-left dropdown">
                <Space>
                  <p style={{ cursor: "pointer" }} className="text-mauve font-bold text-2xl">
                    Welcome, {user.user?.name}
                  </p>
                  <Avatar
                    style={{ cursor: "pointer" }}
                    shape="circle"
                    size="large"
                    src={user.user?.picture}
                  />
                </Space>
              </Dropdown>
            </div>
          </Col>
        </Row>
      </Header>
      <Content style={{ padding: "0 30px" }}>
      <div className="center" style={{marginTop: '10px'}}>
              <Segmented onChange={(value) => {setSelectedMenu(value.toString())}}
                size="large"
                options={[
                  {
                    label: "Reports",
                    value: "Reports",
                    icon: <FileTextOutlined />,
                  },
                  {
                    label: "Analytics",
                    value: "Analytics",
                    icon: <BarChartOutlined />,
                  },
                ]}
              />
            </div>
            {SelectedMenu === 'Reports' ? <Report /> : <Analytics/>}
      </Content>
    </Layout>
     <Footer/>
     </>
  );
};

export default Home;
