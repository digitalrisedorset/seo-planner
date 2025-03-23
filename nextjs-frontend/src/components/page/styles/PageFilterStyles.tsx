import styled from "styled-components";

export const EventFilterStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
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
    .actions {
        display: flex;
        gap: 10px;
    }
`;

export const PreferenceChoice = styled.div`
    /*border: 1px solid var(--mediumgrey);*/
    border: '1px solid var(--red);';
    background: var(--lightgrey);
    margin: 5px 0;
    padding: 5px;
    input {
        visibility: hidden;
    }
`

export const ListHeader = styled.section`
    grid-row: 2;
    width: 100%;
    padding: 20px 40px 0;

    @media (max-width: 600px) {
        padding: 20px 10px 0;
    }
`

export const VenueStyle = styled.div`
    font-size: 1.5rem;
    font-weight: 600;
    select,
        textarea,
        select {
        width: 100%;
        padding: 0.5rem;
        font-size: 1.2rem;
        border: 1px solid black;
    }
    button,
        input[type='submit'] {
        width: auto;
        background: red;
        color: white;
        border: 0;
        font-size: 2rem;
        font-weight: 600;
        padding: 0.5rem 1.2rem;
    }
    fieldset {
        border: 0;
        padding: 0;
    }
`;

export const ResetPrefence = styled.div`
    font-size: 1.5rem;
    button,
    input[type='submit'] {
        width: auto;
        background: var(--mediumgrey);
        color: white;
        border: 0;
        font-size: 1.2rem;
        font-weight: 600;
        padding: 0.5rem 1.2rem;
    }
    fieldset {
        border: 0;
        padding: 0;
    }
    .download-export-file {
        font-size: 0.9rem;
        margin-left: 5px;
        width: 100px;
    }
    @media (max-width: 600px) {
        fieldset {
            p {
                height: 0;
            }
        }
    }
`

export const SharePrefence = styled.div`
    font-size: 1.5rem;
    button,
    input[type='submit'] {
        width: auto;
        background: var(--mediumgrey);
        color: white;
        border: 0;
        font-size: 1.2rem;
        font-weight: 600;
        padding: 0.5rem 1.2rem;
    }
    fieldset {
        border: 0;
        padding: 0;
    }
    @media (max-width: 600px) {
        fieldset {
            p {
                height: 0;
            }
        }
    }
`


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

export const PageList = styled.section`
    display: grid;
    grid-column: 2 / -1;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 13px;
    padding: 10px;

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
    }
`

export const PageStyles = styled.div`
    position: relative;
    background-color: var(--red);
    padding: 10px 0 10px 10px;
    border-radius: 5px;
    background-size:     cover;
    background-repeat:   no-repeat;
    background-position: top left;
    height: 180px;
    .slug {
        display: block;
        color: white;
        text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
        font-weight: normal;
        font-size: 1rem;
        margin-bottom: 1rem;
        width: 50%;
        text-align: left;
        height: 40px;
        overflow: hidden;
    }
    .description {
        font-size: 0.9rem;
        text-align: left;
        display: block;
        width: 60%;
        height: 80px;
        overflow: hidden;
    }
    .date-created {
        position: absolute;
        top: 0;
        right: 5px;
        text-align: left;
        z-index: 1;
        color: white;
        font-size: 0.7rem;
        display: block;
        padding-top: 1rem;
    }
    .ranking {
        position: absolute;
        right: 40px;
        top: -10px;
        height: 25px;
        width: 50px;
        background: #9b713e;
        font-size: x-small;
        padding: 7px 7px;
        border-radius: 20px;
        color: white;
    }
    .priority {
        position: absolute;
        right: -10px;
        top: -10px;        
        height: 25px;
        width: 25px;
        background: #9b713e;
        font-size: small;
        padding: 5px 7px;
        border-radius: 20px;
        color: white;
    }
    .date-completed {
        position: absolute;
        text-align: left;
        right: 5px;
        bottom: 50px;
        z-index: 1;
        color: white;
        font-size: 0.7rem;
        display: block;
        padding-top: 1rem;
    }
    button {
        position: relative;
        margin-right: 5px;
        float: right;
    }
    
    @media (max-width: 600px) {
        .slug {
            font-size: 1rem;
        }
    }
`