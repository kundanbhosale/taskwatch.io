import React from 'react'
import styled from 'styled-components'

type IBannerType = {
  handleClick?: () => void
  title?: string
  summary?: string
  src?: string
  width?: number | `${number}`
  height?: number | `${number}`
} & React.HTMLAttributes<HTMLDivElement>

const StateBanner: React.FC<IBannerType> = ({
  title,
  summary,
  src,
  handleClick,
  width,
  height,
  ...rest
}) => {
  return (
    <Wrapper>
      <div className="banner-content" {...rest}>
        <img
          src={src || ''}
          alt="task-watch-state-banner"
          width={width || 250}
          height={height || 250}
        />
        <p className="banner-summary"> {summary}</p>
        {handleClick ? (
          <a
            className="banner-title primary-border-bottom "
            onClick={handleClick}
          >
            {title}
          </a>
        ) : (
          <p className="banner-title "> {title}</p>
        )}
      </div>
    </Wrapper>
  )
}

/**
 * Empty State Banner
 * @param title it cab be clickable link if you pass handle click
 * @param summary it will be shown above title / clickable link
 * @param src if you want to pass diffrent banner image
 * @param handleClick this will fire on clicking the actionalble like / title
 * @param additonalParams will be image tag attributes
 * @returns
 */
const EmptyStateBanner: React.FC<IBannerType> = ({
  title,
  summary,
  src,
  handleClick,
  ...rest
}) => {
  return (
    <StateBanner
      title={title || 'Create New'}
      summary={summary || `It feels like there's nothing here!`}
      src={src || '/empty.svg'}
      handleClick={handleClick}
      {...rest}
    />
  )
}

/**
 * Error State Banner
 * @param title it cab be clickable link if you pass handle click
 * @param summary it will be shown above title / clickable link
 * @param src if you want to pass diffrent banner image
 * @param handleClick this will fire on clicking the actionalble like / title
 * @param additonalParams will be image tag attributes
 * @returns
 */
const ErrorStateBanner: React.FC<IBannerType> = ({
  title,
  summary,
  src,
  handleClick,
  ...rest
}) => {
  return (
    <StateBanner
      title={title || 'Oh no, Its an error!'}
      summary={summary || 'It feels like something went wrong!'}
      src={src || '/error.svg'}
      handleClick={handleClick}
      width={175}
      height={175}
      {...rest}
    />
  )
}

export { StateBanner, EmptyStateBanner, ErrorStateBanner }

const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  .banner-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .banner-summary {
      margin: 1em 0 0.5em;
      color: ${({ theme }) => theme.shades.dark[600]};
      font-weight: 500;
    }
    .banner-title {
      display: flex;
      align-items: center;
      font-size: 0.875rem;
      font-weight: 600;
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`
