import styled from 'styled-components'

export const FormRow = styled.div`
  display: flex;
  align-items: center;
  margin: 0.8rem 0;

  & > * + * {
    margin-left: 0.5rem;
  }

  &:last-child {
    margin-bottom: 0;
  }
`
