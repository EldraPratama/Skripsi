// import PagiiChatshopLogo from "assets/media/images/pagii-chatshop-logo.svg";
import React from "react";
import features from "../Menu";
// import NavCollapse from "./NavCollapse";
import NavItem from "./NavItem";
import { Stack } from "@mui/material";
import { SidebarContainer } from "./sidebar.styles";
import "../../../asset/css/adminlte.css";
// import "../../../asset/css/"
// import useRedux from "redux/useRedux";


const Sidebar = ({ sidebar }) => {
  // const {
  //   storeState: { Auth },
  // } = useRedux();

  // const Merchant = Auth?.data?.data?.merchant ?? "";

  return (
    <SidebarContainer
      sidebar={sidebar}
      className="main-sidebar sidebar-light-primary elevation-4"
    >
      <div
        className="brand-link"
        style={{ width: "250px", height: "57px", padding: "5% 10%" }}
      >
        <img
          src={`${process.env.PUBLIC_URL}/logo192.png`}
          alt={"icon"}
          style={{ width: "auto", height: "100%" }}
        />
      </div>

      <div className="sidebar">
        <Stack
          direction={"column"}
          className="user-panel mt-3 pb-3 mb-3 d-grid"
        >
          <div className="image text-center">
            <img
              style={{ height: "5rem", width: "5rem" }}
              src={`${process.env.PUBLIC_URL}/logo192.png`}
              className="img-circle elevation-2"
              alt="User"
            />
          </div>
          <div className="info text-center d-block mt-2">
            {/* {Merchant?.businessName} */}
            Merchant
          </div>
        </Stack>

        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" role="menu">
            {features &&
              features.map((item, key) => (
                  <NavItem item={item} key={key} />
                )
              )}
          </ul>
        </nav>
      </div>
    </SidebarContainer>
  );
};

export default Sidebar;
