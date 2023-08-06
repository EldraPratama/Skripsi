import React, { CSSProperties } from "react";
import styled, { css } from "styled-components";
import { Stack, Box } from "@mui/material";
// import { IconChevronDown, IconChevronLeft } from "@tabler/icons";
import { ChevronRight, ExpandMore } from "@mui/icons-material";
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { NormalText } from "components/styled/text.styled";
import NavItem from "./NavItem";

interface Props {
  item?: MenuTypes;
}

export interface MenuTypes {
  id: string;
  type: string;
  path: string;
  permission: string;
  text: string;
  children?: Children[];
  icon?: any;
  margin?: string;
}

interface Children {
  id: string;
  type: string;
  path: string;
  permission: string;
  text: string;
  children?: any;
}

const NavCollapse = ({ item }: Props) => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <BoxStyled
        className="nav-link"
        open={open}
        style={{
          cursor: "pointer",
          background: open ? "rgb(0 0 0 / 10%)" : "",
          borderRadius: open ? "0.25rem" : "",
        }}
      >
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          onClick={() => setOpen(!open)}
        >
          <Stack direction={"row"}>
            <img
              src={item?.icon}
              alt="icon"
              style={{
                width: "20px",
                height: "20px",
                margin: "0 10px 0 0",
              }}
            ></img>
            <NormalText color={"#343a40"} fontSize="14px">
              {item?.text}
            </NormalText>
          </Stack>
          {open ? <ExpandMore /> : <ChevronRight />}
        </Stack>
      </BoxStyled>
      {open && (
        <MenuItemContainer>
          {item &&
            item.children &&
            item.children.map((menu, key) => (
              <NavItem key={key} item={menu}></NavItem>
            ))}
        </MenuItemContainer>
      )}
    </>
  );
};
interface BoxProps {
  open: Boolean;
  style?: CSSProperties;
}

const MenuItemContainer = styled(Box)`
  margin: "0 0 0 5px";
  transition: cubic-bezier(0.55, 0.055, 0.675, 0.19) 0.5s;
`;

const BoxStyled = styled.div<BoxProps>`
  margin: 1px 0;
  padding: 0.5rem 1rem;
  ${(p) =>
    p.open === true &&
    css`
      user-select: none;
      -ms-user-select: none;
      -moz-user-select: none;
      -ms-touch-select: none;
      -webkit-user-select: none;
      color: black !important;
    `}
  &:hover {
    background: #f1f1f1;
    color: black !important;
  }
`;

export default NavCollapse;
