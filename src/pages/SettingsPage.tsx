import React, { useCallback, useContext } from 'react'
import { Button, InputField, Select, Option } from '../components/Atoms'
import { StoreContext, StoreData } from '../common/contexts'
import { Form, Formik } from 'formik'
import styled from '@emotion/styled'
import { BinanceEndpointType } from '../providers/BinanceAPIProvider'

type SettingsFormValues = Pick<
  StoreData,
  'apiKey' | 'secretKey' | 'endpointType'
>

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const SettingsForm = styled(Form)`
  display: flex;
  flex-direction: column;
`

export default function SettingsPage() {
  const {
    store: { apiKey, secretKey, endpointType },
    setStoreValues
  } = useContext(StoreContext) as StoreContext

  const onSubmit = useCallback(
    (values: SettingsFormValues) => {
      setStoreValues(values)
    },
    [setStoreValues]
  )

  return (
    <Container>
      <Formik
        initialValues={{ apiKey, secretKey, endpointType }}
        onSubmit={onSubmit}
      >
        {() => (
          <SettingsForm>
            <InputField name="apiKey" label="API Key" />
            <InputField name="secretKey" label="Secret Key" />
            <InputField
              name="endpointType"
              label="Endpoint Type"
              component={Select}
            >
              <Option value={BinanceEndpointType.Main}>Main</Option>
              <Option value={BinanceEndpointType.Test}>Test</Option>
            </InputField>
            <Button type="submit">Save</Button>
          </SettingsForm>
        )}
      </Formik>
    </Container>
  )
}
