import styled from "styled-components";

export const Input = styled.input`
  display: none;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 125px;
  height: 30px;
  border: 2px solid black;
  padding: 0.85em 1.5em;
  border-radius: 16px;
  font-size: 1em;
  margin-bottom: 0.25em;

  ${({ disabled }) =>
    disabled
      ? `
    background: #cfcdcd;
    color: #807a7a;
    border-color: #cfcdcd;
`
      : `
    color: black;
    transition: all 0.5s;

    &:hover {
        background: black;
        color: #fff;
        cursor: pointer;
    }`}
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100px;
`;

export const Text = styled.p`
  color: ${(props) => (props.$error ? "red" : "black")};
  margin: 0;
`;

export const FileDescription = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 0.375em;
`;
