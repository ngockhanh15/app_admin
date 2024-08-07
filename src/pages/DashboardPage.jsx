import "./DashboardPage.css";
import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Avatar, Button, Col, Layout, Menu, Row, theme } from 'antd';
import { IoAddCircleOutline, IoHomeOutline, IoListOutline, IoLogOutOutline, IoPeopleOutline, IoPersonAddOutline, IoPersonOutline, IoReaderOutline } from "react-icons/io5";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Home from "../components/home/Home";
import AddStaff from "../components/staffs/AddStaff";
import AddUser from "../components/users/AddUser";
import ListUser from "../components/users/ListUser";
import ListStaff from "../components/staffs/ListStaff";

const { Header, Sider, Content } = Layout;

function DashboardPage() {
  const [marginLeft, setMarginLeft] = useState(200);
  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate();

  const siteLayoutStyle = { marginLeft: marginLeft };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0
        }}>
        <div className="demo-logo-vertical">
          <h2>{collapsed ? "QLCB" : "QUẢN LÝ CÁN BỘ"}</h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <IoHomeOutline />,
              label: 'Trang chủ',
              onClick: () => navigate("/")
            },
            {
              key: '2',
              icon: <IoPersonOutline />,
              label: 'Cán bộ',
              children: [
                {
                  key: '21',
                  icon: <IoAddCircleOutline />,
                  label: 'Thêm cán bộ',
                  onClick: () => navigate("/staffs/add")
                },
                {
                  key: '22',
                  icon: <IoListOutline />,
                  label: 'Danh sách',
                  onClick: () => navigate("/staffs/list")
                }
              ]
            },
            {
              key: '3',
              icon: <IoPersonAddOutline />,
              label: 'Người dùng',
              children: [
                {
                  key: '31',
                  icon: <IoAddCircleOutline />,
                  label: 'Tạo người dùng',
                  onClick: () => navigate("/users/add")
                },
                {
                  key: '32',
                  icon: <IoListOutline />,
                  label: 'Danh sách',
                  onClick: () => navigate("/users/list")
                }
              ]
            },
            {
              key: '4',
              icon: <IoPeopleOutline />,
              label: 'Đơn vị',
            },
            {
              key: '5',
              icon: <IoReaderOutline />,
              label: 'Phân quyền'
            },
            {
              key: '6',
              icon: <IoLogOutOutline />,
              label: 'Đăng xuất'
            }
          ]}
        />
      </Sider>
      <Layout style={siteLayoutStyle}>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            right: 16,
            left: marginLeft + 16,
            top: 0,
            position: 'fixed',
            height: 70
          }}
        >
          <Row>
            <Col md={20}>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => {
                  const sts = !collapsed;
                  setCollapsed(sts);
                  setMarginLeft(sts ? 80 : 200);
                }}
                style={{
                  fontSize: '16px',
                  width: 64,
                  height: 64,
                }}
              />
            </Col>
            <Col md={4}>
              <div>
                <Avatar size='default' icon={<UserOutlined />} /> Ngọc Khánh
              </div>
            </Col>
          </Row>
        </Header>
        <Content
          style={{
            margin: '80px 24px 16px 24px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <div className="content-panel">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/staffs/add" element={<AddStaff />} />
              <Route path="/staffs/list" element={<ListStaff />} />
              <Route path="/users/add" element={<AddUser />} />
              <Route path="/users/list" element={<ListUser />} />
            </Routes>
            <Outlet></Outlet>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default DashboardPage;
