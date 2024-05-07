import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: ${(props) => (props.$error ? 0 : "0.625em")};
`;

export const InputContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: baseline;
  margin: 2em auto 0.5em;
  gap: 0.625em;
`;

export const Label = styled.label`
  font-size: 1em;
  font-weight: 600;
`;

export const Text = styled.p`
  font-size: 1.3em;
  font-family: sans-serif;
  font-weight: 100;
`;

export const Error = styled.p`
  color: red;
  margin: 0;
`;

export const DateInput = styled.input`
  border: 3.2px solid black;
  padding: 0.8em 0.9em;
  color: black;
  font-family: inherit;

  ${({ disabled }) =>
    disabled
      ? `
        background: #cfcdcd;
	    border-color: #6a6868;
        color: #6a6868;
      `
      : `&::-webkit-calendar-picker-indicator {
            cursor: pointer;
        }`}
`;
