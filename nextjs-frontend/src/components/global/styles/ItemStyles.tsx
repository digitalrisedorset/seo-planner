import styled from 'styled-components';
import {OPTION_SELECTED} from "@/components/page/types/page";

interface StyleProps {
    required?: boolean;
}

export const EventList = styled.section`
    display: grid;
    grid-row: 3;
    grid-column: 2 / -1;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
    padding: 40px;

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
    }
`

export const SelectStyle = styled.div`
    position: relative;
    display: block;
    text-align: left;
    line-height: 1.4rem;
    margin: 1rem 0;
    label {
        padding: 5px;
    }
`

interface PreferenceProps {
    selected?: 'checked' | ''
}

export const PreferenceChoice = styled.div<PreferenceProps>`
    /*border: 1px solid var(--mediumgrey);*/
    border: ${(props) => props.selected === OPTION_SELECTED && `1px solid var(--red);`};
    background: var(--lightgrey);
    margin: 5px 0;
    padding: 0px;
    input {
        visibility: hidden;
        margin: 0;
        padding: 0;
        height: 0;
    }
    label {
        margin: 0;
        padding: 0 0 10px 10px;
        font-size: 1rem;
    }
`

export const ViewEventStyle = styled.div`
    h5 {
        font-size: 1.5rem;
        padding: 10px;
        background: var(--red);
        color: white;
    }
    .title {
        margin: 1rem;
    }
    .date {
        margin: 1rem;
    }
    .price {
        text-align: left;
        color: var(--black);
        font-weight: bold;
        font-size: 1.5rem;
    }
    .add-to-cart {
        background-color: var(--red);
    }
`

export const EventRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
    align-items: center;
    width: 80%;
    margin: 10px auto;
    font-size: 1.2rem;
    .label {
        text-align: left;
        font-weight: bold;
    }
    .title {
        text-align: left;
    }
    @media (max-width: 600px) {
        width: 95%;
        font-size: 1rem;
        grid-template-columns: 1fr;
    }
`

export const WeekEventList = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    border: 1px solid var(--red);
    margin-top: 1rem;
    min-height: 300px;
    h4 {
        padding: 10px;
        font-weight: bold;
        background: var(--red);
        color: white;
    }

    .accordion-title {
        position: relative;
        .set-active {
            position: absolute;
            right: 10px;
            top:10px;
            color:white;
        }
        
    }
    @media (max-width: 600px) {
        grid-template-columns: 1fr;
    }
`

export const EventDetail = styled.div`
    width: 100%;
    display: block;
    position: relative;  
    padding: 5px;

    @media (max-width: 600px) {
        width:100%;
    }
`

export const ItemStyles = styled.div<StyleProps>`
  background: #FEEBEB;
    border-radius: 20px;
    padding: 1rem;
  border: 1px solid var(--offWhite);
  box-shadow: var(--bs);
  position: relative;
  display: flex;
  flex-direction: column;
    float: left;
    margin: 5px;
    width: 23%;
    height: 170px;
    .date {
        margin: 10px 0;
    }
    .qty {
        position: absolute;
        top:5px;
        width: 30px;
        height: 30px;
        border-radius: 15px;
        right: 5px;
        padding: 5px 10px;
        overflow: hidden;
        font-size: medium;
        text-transform: lowercase;
        border: 1px solid var(--offWhite);
        box-shadow: var(--bs);
        background: white;
    }
    .capacity {
        position: absolute;
        right: 10px;
        bottom: 10px;
        color: #383838;
        font-size: 0.8rem;
    }
  p {
    line-height: 2;
    font-weight: 300;
    flex-grow: 1;
    padding: 0 3rem;
    font-size: 1.5rem;
  }
    .add-to-cart {
        border-radius: 5px;
        padding: 10px;
        position: absolute;
        bottom: 1rem;
        width: 50%;
    }
`;