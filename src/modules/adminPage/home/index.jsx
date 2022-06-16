import { Spin } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import SideBar from "../components/sideBar";
import AdminRouter from "../router";
import "./styles.scss";

const HomeAdmin = () => {
  const { status } = useSelector((state) => state.userPage);
  return (
    <div className="container">
      <Spin spinning={status === "loading"}>
        <SideBar />
        <div className="wrap-content admin-page">
          <AdminRouter />
        </div>
      </Spin>
    </div>
  );
};

export default HomeAdmin;
