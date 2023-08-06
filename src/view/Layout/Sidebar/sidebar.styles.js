import styled, { css } from 'styled-components'

export const SidebarContainer = styled.aside`
    overflow-x: hidden;
    position: fixed !important;
    height: 100%;
    transition: margin-left .4s ease-in all;
    ${p =>
        p.sidebar === true &&
        css`
            width: 0;
        `
    }

`
