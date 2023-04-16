import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { useController, useFormContext } from 'react-hook-form'
import styled from 'styled-components'
import { ISelectOptions } from '../../typings/types'
import UseOutsideClick from '@hooks/outsideClick'

interface IProps {
  name: string
  options: ISelectOptions[]
  multiple?: boolean
}

const Select: React.FC<IProps> = ({ name, options, multiple }) => {
  const [open, setOpen] = useState(false)
  const { control } = useFormContext()

  const handleOutsideClick = () => {
    setOpen(false)
  }

  const getName = useCallback(
    (v: string) => {
      const result = options.find((o) => o.id === v)
      return result?.name
    },
    [options]
  )
  const getColor = useCallback(
    (v: string) => {
      const result = options.find((o) => o.id === v)
      return result?.bg_color
    },
    [options]
  )

  const ref = UseOutsideClick(open, handleOutsideClick)

  const {
    field: { onChange, value },
  } = useController({
    name,
    control,
  })

  const handleAdd = (val: string) => {
    const exists = multiple && value.indexOf(val) !== -1
    if (exists) return
    onChange(multiple ? [...value, val] : val)

    return setOpen(false)
  }

  const handleRemove = (val: string) => {
    if (value.length <= 1 || !multiple) return
    return onChange(value.filter((item: string) => item !== val))
  }

  useEffect(() => {
    if (!ref.current) return
    const wrapper = ref.current.querySelector('.options-wrapper') as HTMLElement
    const height = wrapper?.children[0].clientHeight
    wrapper.style.height = open ? height + 'px' : '0px'
  }, [ref.current, open])

  return (
    <Fragment>
      <Wrapper className={open ? 'open' : ''} ref={ref}>
        <div className="select-active" onClick={() => setOpen(!open)}>
          {value &&
            (multiple ? (
              value.map((v: ISelectOptions, i: number) => (
                <Badge
                  onClick={() => handleRemove(v.id)}
                  key={i}
                  color={v.bg_color}
                >
                  {v.name}
                </Badge>
              ))
            ) : (
              <Badge
                onClick={() => handleRemove(value)}
                color={getColor(value)}
              >
                {getName(value)}
                {value.bg_color}
              </Badge>
            ))}
        </div>
        <div className="options-wrapper">
          <ul>
            {options &&
              options.map((v: ISelectOptions, i: number) => (
                <li
                  className="select-key"
                  key={i}
                  onClick={() => handleAdd(v.id)}
                >
                  <Badge color={v.bg_color}>{v.name || '-'}</Badge>
                </li>
              ))}
          </ul>
        </div>
      </Wrapper>
    </Fragment>
  )
}

export default Select

const Badge = styled.span<{ color: string | undefined }>`
  padding: 0.3em ${({ color }) => (!color ? 0 : '1em')};
  border-radius: 4px;
  font-size: 0.8rem;
  margin-right: 0.5em;
  position: relative;
  background-color: ${({ color }) => color || '#ddd'};
  font-weight: 500;
  width: fit-content;
`

const Wrapper = styled.div`
  display: block;
  user-select: none;
  position: relative;

  &.open {
    .options-wrapper {
      box-shadow: 3px 6px 5px 0px ${({ theme }) => theme.shades.dark[100]};
    }
    .select-active {
      border-color: ${({ theme }) => theme.shades.primary[700]};
    }
  }
  .select-active {
    border-width: 1.5px;
    border-style: solid;
    border-color: ${({ theme }) => theme.shades.dark[100]};
    border-radius: 6px;
    padding: 0.3em;
    cursor: pointer;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    grid-gap: 0.4em 0.2em;
  }
  .options-wrapper {
    position: absolute;
    transition: height ease-in-out 0.15s;
    top: calc(100% + 5px);
    width: 100%;
    height: 0px;
    border-radius: 6px;
    overflow: hidden;
    z-index: 100;
  }
  ul {
    margin: 0;
    padding: 0.3em;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 6px;
    border: 1px solid ${({ theme }) => theme.shades.dark[100]};
    overflow-y: auto;
    max-height: 200px;

    li {
      margin: 0;
      padding: 0.3em;
      cursor: pointer;
      border-radius: 6px;
      &:hover {
        background-color: ${({ theme }) => theme.shades.primary[100]};
      }
    }
  }
`
