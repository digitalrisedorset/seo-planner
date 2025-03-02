import styled from 'styled-components';

export const MainStyles = styled.main`
    font-family: sans-serif;
    color: #343040;
    font-size: 1rem;
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    font-weight: bold;
    display: grid;
    grid-template-columns: 80px 1fr;
    grid-template-rows: 60px 1fr 3fr;
    height: 100vh;

    @media (max-width: 600px) {
        grid-template-columns: 0px 1fr;
        grid-template-rows: 100px 1fr 3fr;
        width: 100%;
    }
`

export const Section = styled.section`
    display: grid;
    grid-row: 2;
    grid-column: 2 / -1;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    padding: 40px;

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
        padding: 0px;
    }
`