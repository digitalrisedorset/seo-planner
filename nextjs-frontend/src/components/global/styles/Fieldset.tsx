import styled from 'styled-components';

export const Fieldset = styled.div`
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
