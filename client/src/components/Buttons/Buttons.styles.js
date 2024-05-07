import styled from "styled-components";

export const StyledButton = styled.button`
  height: 50px;
  width: 145px;
  padding: 0.5em;
  border-radius: 32px;
  background: none;
  font-size: 1em;

  ${({ disabled }) =>
    !disabled &&
    ` 
        &:hover {
          cursor: pointer;
          transition: all 0.5s;
          background: black;
          color: #fff;
        }
      `}
`;

export const StyledRemoveButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: 1.6px solid black;
  border-radius: 32px;
  font-size: 0.6em;
  height: 15px;
  width: 15px;
  font-weight: 600;

  &:hover {
    cursor: pointer;
    background: black;
    color: #fff;
    transition: all 0.5s;
  }
`;
