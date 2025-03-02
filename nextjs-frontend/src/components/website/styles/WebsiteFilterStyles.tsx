import styled from "styled-components";

export const EventFilterStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 2fr 1fr;
  grid-gap: 1rem;
    
    div p {
        font-size: 1.2rem;
       height: 60px;
    }
    fieldset label {

    }

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
        div p {
            font-size: 1.2rem;
            height: 30px;
        }
    }
`;


export const EmptyListingStyles = styled.div`
    grid-column: 1 / -1;
    grid-row: 1;
    width: 100%;
    padding: 20px 20px 0;
    h1 {
        color: var(--red);  
        font-weight: bold;
        font-size: 1.8rem;
    }
`

export const WebsiteList = styled.div`
    display: grid;
    grid-column: 2 / -1;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
    padding: 10px;

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
    }
`

export const WebsiteStyles = styled.div`
    position: relative;
    background-color: var(--red);
    padding: 30px;
    border-radius: 5px;
    background-size:     cover;
    background-repeat:   no-repeat;
    background-position: top left;
    .title {
        display: block;
        color: white;
        text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
        font-weight: normal;
        font-size: 1.5rem;
        margin-bottom: 2rem;
        width: 95%;
        text-align: center;
    }
    .date {
        position: relative;
        z-index: 1;
        color: white;
        font-size: 1.1rem;
        line-height: 2;
        display: block;
        padding-top: 1rem;
    }
    .date:before {
        content: " ";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        opacity: .3;
        z-index: -1;
        background-color: var(--red);
        border-radius: 10px;
    }

    @media (max-width: 600px) {
        .title {
            font-size: 2rem;
        }
    }
`