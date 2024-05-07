import { StyledButton, StyledRemoveButton } from "./Buttons.styles";

export const BasicButton = ({ onClick, disabled, text }) => {
  return (
    <StyledButton onClick={onClick} disabled={disabled}>
      {text}
    </StyledButton>
  );
};

export const RemoveButton = ({ onClick }) => {
  return <StyledRemoveButton onClick={onClick}> x </StyledRemoveButton>;
};
