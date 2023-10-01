import React, { useState } from "react";
import { 
  Menu,
  PowerSettingsNew 
} from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import { HeaderContainer } from "./header.styles";
import { IconButton, Box } from "@mui/material";
import Confirmation from "../../Component/confirmation.tsx"



const Header = ({ open, onHamburgerClick }) => {

  const namaPetugas = sessionStorage.getItem('nama');
  const [konfirmasiLogout, setKonfirmasiLogout] = useState(false);
  const navigate = useNavigate();


  return (
    <HeaderContainer
      open={open}
      className={`main-header navbar navbar-expand navbar-white navbar-light`}
    >
      <Confirmation
        title="Konfirmasi"
        titleStyle={{ fontWeight: "bold" }}
        description="Yakin mau Logout?"
        open={konfirmasiLogout}
        handleClose={() => setKonfirmasiLogout(false)}
        handleConfirm={() => { 
          setKonfirmasiLogout(false)
          navigate("/login")
        }}
      />
      <ul className="navbar-nav">
        <li className="nav-item" onClick={onHamburgerClick}>
          <IconButton>
            <Menu/>
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

        <li className="nav-item nav-item mt-2 mr-3">
          Hallo, {namaPetugas}
        </li>
        <li className="nav-item">
          <Box
            className="nav-link"
            onClick={() => setKonfirmasiLogout(true)}
            style={{ cursor: "pointer" }}
          >
            <PowerSettingsNew/>
          </Box>
        </li>
      </ul>
    </HeaderContainer>
  );
};


export default Header;
