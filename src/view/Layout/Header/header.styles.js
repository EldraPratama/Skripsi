import styled, { css } from 'styled-components'
// import { HeaderProps } from './index'

export const HeaderContainer = styled.nav`
    transition: margin-left .3s ease-in-out;
    margin-left: 250px;
    ${p =>
        p.open &&
        css`
            margin-left: 0 !important;
    `}
    
`
