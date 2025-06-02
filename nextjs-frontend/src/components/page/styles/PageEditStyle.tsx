import styled from "styled-components";

export const PageEditStyle = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 1rem;    
`;

interface ActiveProps {
    active: 'true' | 'false'
}

export const PageVersionStyles = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== '$active'
})<ActiveProps>`
    position: relative;
    align-items: center;
    margin: 2rem 1rem;
    width: 100%;
    border: ${(props) => (props.active === 'true') ? '1px solid var(--red)' : '1px solid #ccc'};
    padding: 1rem;
    .version-number {
        position: absolute;
        top: -15px;
        left: 10px;
        background: white;
        padding: 0 10px;
        border-bottom: 1px solid ;
    }
    div {
        display: flex;
        flex-direction: column;
        .version-details-grid {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
        }

        .row {
            display: grid;
            grid-template-columns: 100px 1fr;
            align-items: start;
        }

        .label {
            font-weight: bold;
            color: #333;
            font-size: 0.9rem;
            text-align: left;
        }

        .value {
            color: #222;
            white-space: pre-wrap;
            word-break: break-word;
            text-align: left;
        }

        /* Emphasize slug */
        .main-row .value {
            font-size: 0.8rem;
            font-weight: 500;
        }

        /* Sub-details smaller and lighter */
        .sub-row .value {
            font-size: 0.6rem;
            color: #666;
        }
    }
    .label {
        font-weight: bold;
        font-size: 1.1rem;
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