import styled, { keyframes } from 'styled-components';

const loading = keyframes`
  from {
    background-position: 0 0;
    /* rotate: 0; */
  }

  to {
    background-position: 100% 100%;
    /* rotate: 360deg; */
  }
`;

export const Form = styled.form`
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
  background: rgba(0, 0, 0, 0.02);
  border: 5px solid white;
  padding: 20px;
  font-size: 1.1rem;
  line-height: 1.5;
  font-weight: 500;
  label {
    display: block;
    margin-bottom: 1rem;
  }
  input,
  textarea,
  select {
    width: 100%;
    padding: 0.5rem;
      font-size: 1.2rem;
    border: 1px solid var(--red);
    &:focus {
      outline: 0;
      border-color: var(--black);
    }
  }
  button,
  input[type='submit'] {
    width: auto;
    background: var(--black);
      border-radius: 5px;
    color: white;
    border: 0;
    font-size: 1.3rem;
    font-weight: 200;
    padding: 0.5rem 1.4rem;
  }
  fieldset {
      border: 0;
      padding: 0;

      &[disabled] {
          opacity: 0.5;
      }

      &::before {
          height: 10px;
          content: '';
          display: block;
          background-image: linear-gradient(
                  to right,
                  var(--red) 0%,
                  var(--offWhite) 50%,
                  var(--black) 100%
          );
      }

      &[aria-busy='true']::before {
          background-size: 50% auto;
          animation: ${loading} 0.5s linear infinite;
      }
  }
    h2 {
        font-weight: normal;
        font-size: 1.6rem;
    }

    @media (max-width: 600px) {
        padding: 10px;
        input,
        select {
            width: 100%;
            height: 40px;
        }
        textarea {
            width: 100%;
        }
        label {
            font-size: 1.2rem;
        }
        h2 {
            font-size: 1.5rem;
        }
        button,
        input[type='submit'] {
            font-size: 1.5rem;
            padding: 0.4rem 1rem;
        }
    }
`;

export const Label = styled.p`
    margin: 5px 0 0;
`
