import React, { useCallback, useContext, useEffect, useRef } from 'react'
import { Button } from '../components/Atoms'
import { HotkeyAction, StoreContext, StoreData } from '../common/contexts'
import styled from '@emotion/styled'
import { Form, Formik } from 'formik'
import useHotkeys from '../hooks/useHotkeys'

type MainFormValues = Pick<StoreData, 'symbol' | 'secretKey' | 'endpointType'> &
  HotkeyAction

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const MainForm = styled(Form)`
  display: flex;
  flex-direction: row;
`

const MainFormWrapper = () => {
  const node = useRef()
  const {
    store: { hotkeys: savedHotkeys },
    setStoreValue
  } = useContext(StoreContext) as StoreContext
  const { set, unset, hotkeys } = useHotkeys(node.current, savedHotkeys)

  const [forms, setForms] = useState(savedHotkeys)

  useEffect(() => {
    setStoreValue('hotkeys', hotkeys)
  }, [hotkeys])

  const onSubmit = useCallback(
    (values: SettingsFormValues) => {
      set()
    },
    [set]
  )

  return (
    <Container ref={node.current}>
      {forms.map((form) => (
        <Formik
          initialValues={{ apiKey, secretKey, endpointType }}
          onSubmit={onSubmit}
        >
          {() => (
            <MainForm>
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
            </MainForm>
          )}
        </Formik>
      ))}

      <Button>Add Hotkey</Button>
    </Container>
  )
}

export default function MainPage() {
  const {
    store: { hotkeyActions }
  } = useContext(StoreContext) as StoreContext

  return <Container></Container>
}
