import styled from '@emotion/styled'
import { Field, FieldProps } from 'formik'
import React, { ComponentType } from 'react'

export const Input = styled.input`
  outline: none;
  background-color: transparent;
  border: 1px solid #ccc;
  border-radius: 5px;
  color: #ccc;
  padding: 5px;
`

export const Select = styled.select`
  outline: none;
  background-color: transparent;
  border: 1px solid #ccc;
  border-radius: 5px;
  color: #ccc;
  padding: 5px;
`

export const Option = styled.option`
  outline: none;
  background-color: #111;
  border: 1px solid #ccc;
  border-radius: 5px;
  color: #ccc;
  padding: 5px;

  &:hover {
    background-color: #333;
  }
`

export const Button = styled.button`
  outline: none;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  background-color: transparent;
  color: #ccc;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }
`

const InputFieldWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 400px;
  margin-bottom: 10px;
`

const InputFieldLabel = styled.label`
  font-size: 14px;
  margin-right: 10px;
`

interface InputFieldProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  name: string
  label: string
  component?: ComponentType
}

export const InputField = ({
  name,
  label,
  component: Component = Input,
  ...props
}: InputFieldProps) => (
  <InputFieldWrapper>
    <InputFieldLabel htmlFor={name}>{label}</InputFieldLabel>
    <Field name={name}>
      {({ field }: FieldProps) => <Component {...field} {...props} />}
    </Field>
  </InputFieldWrapper>
)
