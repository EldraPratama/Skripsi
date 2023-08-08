import React from "react";
import styled from "styled-components";
import { Stack, Box } from "@mui/material";
// import { NormalText } from "components/styled/text.styled";
import { Link } from "react-router-dom";


const NavItem = ({ item }) => {
  return (
    <BoxStyled
      component={"li"}
      className={"nav-link"}
      sx={{ cursor: "pointer" }}
    >
      <Link to={item?.path ?? ""}>
        <Stack
          direction={"row"}
          justifyContent={"flex-start"}
          margin={item?.margin}
        >
          {item?.icon && (
              item.icon
          )}
          <p color={"#343a40"} fontSize="14px" style={{marginLeft:"5px"}} >
            {item?.text}
          </p>
        </Stack>
      </Link>
    </BoxStyled>
  );
};

const BoxStyled = styled(Box)`
  margin: 1px 0;
  &:hover {
    background: #f1f1f1;
  }
  &:focus {
    background: #ffc535;
  }
  &:active {
    background: #ffc535;
    color: white !important;
  }
`;

export default NavItem;
