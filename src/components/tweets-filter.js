import React, { useState } from 'react'
import styled from 'styled-components'

const StyledInput = styled.input`
  width: 100%;
  margin-bottom: 1rem;
`

const TweetsFilter = ({ setFilterText }) => {
  const [currentText, setCurrentText] = useState('')

  const handleChange = (event) => {
    setCurrentText(event.target.value)
    setFilterText(event.target.value)
  }

  return (
    <StyledInput
      type="text"
      value={currentText}
      onChange={handleChange}
      placeholder="Type to filter…"
    />
  )
}

export default TweetsFilter
