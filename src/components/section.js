import styled, { css } from 'styled-components'

const section = css`
  width: 100%;
  padding: 1.5rem;
  background: white;
  border-radius: 0.5rem;
  border: var(--border);
  margin: 10px 0;
`

const Section = styled.section`
  ${section}
`

export const SectionDivider = styled.hr`
  border: var(--border);
  border-top: none;
  width: calc(100% + 2 * 1.5rem);
  margin: 1rem 0;
  margin-left: -1.5rem;
`

export const SectionHeader = styled.h2`
  text-transform: uppercase;
  font-size: 0.9rem;
  font-weight: bold;
  margin: 0;
  margin-bottom: 1rem;
`

export const TweetSection = styled.section`
  width: 100%;
  & > .twitter-tweet:not(.twitter-tweet-rendered) {
    ${section}
    margin-left: 0;
    p {
      margin-top: 0;
    }
  }
`

export default Section
