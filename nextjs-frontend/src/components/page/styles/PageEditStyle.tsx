import styled from "styled-components";

export const PageEditStyle = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 1rem;    
`;

interface ActiveProps {
    active: 'true' | 'false'
}

export const PageVersionStyles = styled.div<ActiveProps>`
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 1rem;
    align-items: center;
    margin: 1rem;
    width: 100%;
    border: ${(props) => (props.active === 'true') ? '1px solid var(--red)' : '1px solid #ccc'};
    padding: 1rem;
    div {
        display: flex;
        flex-direction: column;
    }
    .label {
        font-weight: bold;
    }
    .actions {
        display: flex;
        flex-direction: row;
        gap: 1rem; 
        button {
            margin-top: 1rem;
            flex: 1; 
            padding: 0.3rem 0.1rem;
            border: 1px solid #999;
            border-radius: 4px;
            background-color: #f5f5f5;
            cursor: pointer;
            transition: background-color 0.2s ease;
            font-size: 0.9rem;

            &:hover {
                background-color: #e0e0e0;
            }
        }
    }
`

export const PageVersionList = styled.section`
    
    
`