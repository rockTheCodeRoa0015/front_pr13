import styled from 'styled-components'

const StyledButton = styled.button`
  width: 150px;
  border-radius: var(--rtc-border-radius-button);
  border: none;
  background-color: var(--rtc-background-green);
  padding: var(--rtc-padding-xs) 0;
  cursor: pointer;
  color: var(--rtc-color-white);
  &:hover {
    background-color: var(--rtc-background-greenHover);
  }
`

export default StyledButton
