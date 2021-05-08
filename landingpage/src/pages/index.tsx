import React, { useState } from 'react'
import { Link } from 'gatsby'
import { Input, Button } from 'react-rainbow-components'
import { Divider, TableContainer, Table, TableRow, TableCell, TableBody } from '@material-ui/core'

import Page from '../components/Page'
import Container from '../components/Container'
import IndexLayout from '../layouts'

interface UrlParams {
  key: string
  value: string
}

const IndexPage = () => {
  const [deepLinkParams, setDeepLinkParams] = useState<UrlParams[]>([])
  const [referrerValue, setReferrerValue] = useState<string>('')

  const deepLinkParamsKeyOnChange = (index: number, inputValue: string): void => {
    const urlParamsPair = deepLinkParams[index]
    urlParamsPair.key = inputValue
    deepLinkParams[index] = urlParamsPair
    setDeepLinkParams([...deepLinkParams])
  }

  const deepLinkParamsValueOnChange = (index: number, inputValue: string): void => {
    const urlParamsPair = deepLinkParams[index]
    urlParamsPair.value = inputValue
    deepLinkParams[index] = urlParamsPair
    setDeepLinkParams([...deepLinkParams])
  }

  const deepLinkDeleteParamsButtonOnClick = (index: number): void => {
    deepLinkParams.splice(index, 1)
    setDeepLinkParams([...deepLinkParams])
  }

  const deepLinkAddParamsButtonOnClick = () => {
    setDeepLinkParams([...deepLinkParams, { key: '', value: '' }])
  }

  const referrerValueOnChange = (inputValue: string): void => {
    setReferrerValue(inputValue)
  }

  const deeplinkRootUrl = 'referrersample://thisissample'

  let deepLinkUrl = deeplinkRootUrl
  if (deepLinkParams.length > 0) {
    const urlParamsPairStrings: string[] = []
    for (const params of deepLinkParams) {
      if (params.key && params.key.length > 0) {
        urlParamsPairStrings.push([params.key, params.value].join('='))
      }
    }
    if (urlParamsPairStrings.length > 0) {
      deepLinkUrl = deepLinkUrl + '?' + urlParamsPairStrings.join('&')
    }
  }

  let marketHTTPSInstallReferrerUrl = 'https://play.google.com/store/apps/details?id=com.taku.kobayashi.refarorsample'
  let marketDeepLinkInstallReferrerUrl = 'market://details?id=com.taku.kobayashi.refarorsample'
  if (referrerValue && referrerValue.length > 0) {
    marketHTTPSInstallReferrerUrl = [marketHTTPSInstallReferrerUrl, 'referrer=' + referrerValue].join('&')
    marketDeepLinkInstallReferrerUrl = [marketDeepLinkInstallReferrerUrl, 'referrer=' + referrerValue].join('&')
  }

  return (
    <IndexLayout>
      <Page>
        <Container>
          <div style={{ fontSize: '24px' }}>
            <b style={{ color: '#FF0000' }}>Google Play Store HTTP URL:</b>
            <a href={marketHTTPSInstallReferrerUrl}>{marketHTTPSInstallReferrerUrl}</a>
          </div>
          <div style={{ fontSize: '24px' }}>
            <b style={{ color: '#FF0000' }}>Google Play Store App URL:</b>
            <a href={marketDeepLinkInstallReferrerUrl}>{marketDeepLinkInstallReferrerUrl}</a>
          </div>
          <Divider />
          <Input
            placeholder="Referrer Value"
            type="text"
            label="Referrer Value"
            className="rainbow-p-around_medium"
            onChange={event => referrerValueOnChange(event.target.value)}
            value={referrerValue}
          />
          <Divider />
          <div style={{ fontSize: '24px' }}>
            <b style={{ color: '#FF0000' }}>Deeplink URL:</b> <a href={deepLinkUrl}>{deepLinkUrl}</a>
          </div>
          <Divider />
          <TableContainer>
            <Table>
              <TableBody>
                {deepLinkParams.map((urlPrams, index) => {
                  return (
                    <TableRow>
                      <TableCell>
                        <Input
                          placeholder="Key"
                          type="text"
                          className="rainbow-p-around_medium"
                          onChange={event => deepLinkParamsKeyOnChange(index, event.target.value)}
                          value={urlPrams.key}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          placeholder="Value"
                          type="text"
                          className="rainbow-p-around_medium"
                          onChange={event => deepLinkParamsValueOnChange(index, event.target.value)}
                          value={urlPrams.value}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          label="-"
                          variant="destructive"
                          className="rainbow-m-around_medium"
                          onClick={() => deepLinkDeleteParamsButtonOnClick(index)}
                        />
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Button label="+" variant="border-filled" className="rainbow-m-around_medium" onClick={deepLinkAddParamsButtonOnClick} />
          <Divider />
        </Container>
      </Page>
    </IndexLayout>
  )
}

export default IndexPage
