import styled from "styled-components";

const HeaderStyles = styled.nav`
    position: relative;
    background-color: 'var(--darkgrey)';
    color: #ffffff;
    grid-column: 1;
    grid-row: 1 / -1;
    logo {
        position: absolute;
        top: 10px;
        left:5px;
    }
`;

export default HeaderStyles;