import React, { Fragment } from 'react'
import { useFormContext } from 'react-hook-form'

export const FormInput = (
  props: React.InputHTMLAttributes<HTMLInputElement> & {
    name: string
    small?: boolean
  }
) => {
  const { name, className, small, ...rest } = props
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const error = errors[name]?.message as string

  return (
    <Fragment>
      <div className={className}>
        <input
          className={`form-input ${error ? 'has_error' : ''}`}
          style={small ? { height: '32px' } : {}}
          {...register(name)}
          {...rest}
        />
        {error && <p className="error-message">{error}</p>}
      </div>
    </Fragment>
  )
}
