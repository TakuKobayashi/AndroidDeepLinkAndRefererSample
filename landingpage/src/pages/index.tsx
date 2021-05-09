import React, { useState } from 'react'
import { Input, Button } from 'react-rainbow-components'
import { Divider, TableContainer, Table, TableRow, TableCell, TableBody, Typography, Card, CardContent } from '@material-ui/core'

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

  const marketHTTPSRootUrl = 'https://play.google.com/store/apps/details?id=com.taku.kobayashi.refarorsample'
  let marketHTTPSInstallReferrerUrl = marketHTTPSRootUrl
  let marketDeepLinkInstallReferrerUrl = 'market://details?id=com.taku.kobayashi.refarorsample'
  if (referrerValue && referrerValue.length > 0) {
    marketHTTPSInstallReferrerUrl = [marketHTTPSInstallReferrerUrl, 'referrer=' + referrerValue].join('&')
    marketDeepLinkInstallReferrerUrl = [marketDeepLinkInstallReferrerUrl, 'referrer=' + referrerValue].join('&')
  }

  return (
    <IndexLayout>
      <Page>
        <Container>
          <Typography variant="h3" component="h1">
            ここではReferrerとDeeplinkを試すことができます
          </Typography>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                試すことができるアプリはこちらにて公開されています
                <a href={marketHTTPSRootUrl}><img src="https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png" /></a>
              </Typography>
            </CardContent>
          </Card>
          <Divider />
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                以下を使うことでReferrerを取得するサンプルを試すことができます
              </Typography>
              <TableContainer>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Typography component="p">
                          <b style={{ color: '#FF0000' }}>Google Play Store URL</b>
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography component="p">
                          <a href={marketHTTPSInstallReferrerUrl}>{marketHTTPSInstallReferrerUrl}</a>
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography component="p">
                          <b style={{ color: '#FF0000' }}>Google Play Store App URL</b>
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography component="p">
                          <a href={marketDeepLinkInstallReferrerUrl}>{marketDeepLinkInstallReferrerUrl}</a>
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <Input
                placeholder="Referrer Value"
                type="text"
                label="Referrerとして送りたい文字列の入力"
                className="rainbow-p-around_medium"
                onChange={event => referrerValueOnChange(event.target.value)}
                value={referrerValue}
              />
            </CardContent>
          </Card>
          <Divider />
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                以下を使うことでDeepLinkに送られた値を受け取る様子を試すことができます
              </Typography>
              <TableContainer>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <b style={{ color: '#FF0000' }}>Deeplink URL</b>
                      </TableCell>
                      <TableCell>
                        <a href={deepLinkUrl}>{deepLinkUrl}</a>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
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
            </CardContent>
          </Card>
        </Container>
      </Page>
    </IndexLayout>
  )
}

export default IndexPage
