import styled from 'styled-components';

const NavStyles = styled.menu`
    background-color: '#595f39';
    color: #fff;
    grid-column: 2 / -1;
    display: flex;
    gap: 20px;
    align-items: center;
    padding: 0 40px;
    position: relative;
    a, button {
        display: inline-block;
        font-size: 16px;
        background-color: var(--mediumgrey);
        border: none;
        cursor: pointer;
        color: white;
        padding: 8px 12px;
        text-decoration: none;
    }

    button:last-child {
        background-color: var(--red);
        margin-left: auto;
    }
    button span {
        position: absolute;
    }
    @media (max-width: 600px) {
        padding: 0 10px;
        gap: 10px;
        margin-left: 80px;
        a, button {
            font-size: 1rem;
            padding:4px;
            width:70px;
        }
        .venue-title {
            font-size:1.0rem;
            left:50%;
            padding: 5px 5px;
            visibility: hidden;
        }        
    }
`;

export const PageStyles = styled.div`
    margin: 2rem;
    a, button {
        display: inline-block;
        font-size: 1.4rem;
        background-color: var(--red);
        border-radius: 10px;
        border: none;
        cursor: pointer;
        color: white;
        padding: 15px 20px;
        text-decoration: none;
    }
`



export default NavStyles;