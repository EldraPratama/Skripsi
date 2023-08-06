import styled, { css } from "styled-components";

export const Container = styled.div`
    background: #f4f6f9;
    margin: 0 0 0 250px;
    padding: 15px;
    min-height: calc(100vh - calc(3.5rem + 1px));
    transition: margin-left 0.3s ease-in-out;
    overflow-x: hidden !important;

    ${p =>
        p.open === true &&
        css`
            width: 100% !important;
            margin: unset !important;
        `
    }
`
