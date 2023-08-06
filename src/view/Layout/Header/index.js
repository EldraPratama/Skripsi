import React, { useState } from "react";

//import { NormalText } from "src/components/styled/text.styled";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBars } from "@fortawesome/free-solid-svg-icons";
import { HeaderContainer } from "./header.styles";
// import NotificationSection from "./Notification";
// import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
// import ConfirmationModal from "components/Modal/confirmation";
//import styled from "styled-components";
// import "asset/css/adminlte.css";
// import useRedux from "redux/useRedux";
// import { AuthLogout } from "redux/auth";
import { IconButton } from "@mui/material";

// export interface HeaderProps {
//   open?: Boolean;
//   onHamburgerClick?: any;
// }

const Header = ({ open, onHamburgerClick }) => {
  // const {
  //   thunkDispatch,
  //   storeState: { Auth, Notification },
  // } = useRedux();
  const [confirmOpen, setConfirmOpen] = useState(false);

  // const handleLogout = () => {
  //   setTimeout(() => {
  //     thunkDispatch(AuthLogout())
  //       .unwrap()
  //       .then(() => {
  //         setConfirmOpen(false);
  //       });
  //   }, 3000);
  // };

  return (
    <HeaderContainer
      open={open}
      className={`main-header navbar navbar-expand navbar-white navbar-light`}
    >
      <ul className="navbar-nav">
        <li className="nav-item" onClick={onHamburgerClick}>
          <IconButton>
            {/* <FontAwesomeIcon icon={faBars}></FontAwesomeIcon> */}
          </IconButton>
        </li>
      </ul>

      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a className="nav-link" href="/#0" role="button">
            <i className="fas fa-search"></i>
          </a>
          <div className="navbar-search-block">
            <form className="form-inline">
              <div className="input-group input-group-sm">
                <input
                  className="form-control form-control-navbar"
                  type="search"
                  placeholder="Search"
                />
                <div className="input-group-append">
                  <button className="btn btn-navbar" type="submit">
                    <i className="fas fa-search"></i>
                  </button>
                  <button className="btn btn-navbar" type="button">
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </li>
        {/* <List className="nav-item">
          <a className="nav-link" href="/#0">
            <NormalText color={"rgba(0, 0, 0, 0.5)"} isPressable>
              Merchant Guide
            </NormalText>
          </a>
        </List> */}
        {/* <List className="nav-item">
          <a className="nav-link" href="/#0">
            <NormalText color={"rgba(0, 0, 0, 0.5)"} isPressable>
              Contact CS
            </NormalText>
          </a>
        </List> */}

        {/* <li className="nav-item">
          <NotificationSection
            notifications={Notification.notifications}
            counter={Notification.notificationCount}
          />
        </li> */}

        <li className="nav-item">
          <a
            className="nav-link"
            onClick={() => setConfirmOpen(!confirmOpen)}
            style={{ cursor: "pointer" }}
            href="#0"
          >
            {/* <FontAwesomeIcon icon={faPowerOff} /> */}
          </a>
        </li>
      </ul>

      {/* Modal Logout */}
      {/* <ConfirmationModal
        title="Confirmation"
        titleStyle={{ fontWeight: "bold" }}
        description="Are you sure want to end your session?"
        open={confirmOpen}
        handleClose={() => setConfirmOpen(!confirmOpen)}
        handleConfirm={() => handleLogout()}
      ></ConfirmationModal> */}
    </HeaderContainer>
  );
};

// const List = styled.li`
//   transition: ease-in-out 0.3s;
//   @media only screen and (max-width: 768px) {
//     display: none;
//   }
// `;

export default Header;
