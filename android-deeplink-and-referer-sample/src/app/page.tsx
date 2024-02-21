'use client';

import { useState } from 'react';
import {
  Input,
  Button,
  Divider,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

interface UrlParams {
  key: string;
  value: string;
}

export default function Home() {
  const [deepLinkParams, setDeepLinkParams] = useState<UrlParams[]>([]);
  const [referrerValue, setReferrerValue] = useState('');

  const deepLinkParamsKeyOnChange = (index: number, inputValue: string): void => {
    const urlParamsPair = deepLinkParams[index];
    urlParamsPair.key = inputValue;
    deepLinkParams[index] = urlParamsPair;
    setDeepLinkParams([...deepLinkParams]);
  };

  const deepLinkParamsValueOnChange = (index: number, inputValue: string): void => {
    const urlParamsPair = deepLinkParams[index];
    urlParamsPair.value = inputValue;
    deepLinkParams[index] = urlParamsPair;
    setDeepLinkParams([...deepLinkParams]);
  };

  const deepLinkDeleteParamsButtonOnClick = (index: number): void => {
    deepLinkParams.splice(index, 1);
    setDeepLinkParams([...deepLinkParams]);
  };

  const deepLinkAddParamsButtonOnClick = () => {
    setDeepLinkParams([...deepLinkParams, { key: '', value: '' }]);
  };

  const referrerValueOnChange = (inputValue: string): void => {
    setReferrerValue(inputValue);
  };

  const deepLinkUrl = new URL('referrersample://thisissample');
  const deeplinkUrlParams = new URLSearchParams(deepLinkUrl.searchParams);
  for (const params of deepLinkParams) {
    if (params.key && params.key.length > 0) {
      deeplinkUrlParams.set(params.key, params.value);
    }
  }
  deepLinkUrl.search = deeplinkUrlParams.toString();

  const marketHTTPSRootUrl = new URL('https://play.google.com/store/apps/details?id=com.taku.kobayashi.refarorsample');
  const marketHTTPSInstallReferrerUrl = new URL(marketHTTPSRootUrl);
  const marketHTTPSInstallReferrerUrlParams = new URLSearchParams(marketHTTPSInstallReferrerUrl.searchParams);
  const marketDeepLinkInstallReferrerUrl = new URL('market://details?id=com.taku.kobayashi.refarorsample');
  const marketDeepLinkInstallReferrerUrlParams = new URLSearchParams(marketDeepLinkInstallReferrerUrl.searchParams);
  if (referrerValue && referrerValue.length > 0) {
    marketHTTPSInstallReferrerUrlParams.set('referrer', referrerValue);
    marketDeepLinkInstallReferrerUrlParams.set('referrer', referrerValue);
  }
  marketHTTPSInstallReferrerUrl.search = marketHTTPSInstallReferrerUrlParams.toString();
  marketDeepLinkInstallReferrerUrl.search = marketDeepLinkInstallReferrerUrlParams.toString();
  return (
    <main>
      <Typography variant='h3' component='h1'>
        ここではReferrerとDeeplinkを試すことができます
      </Typography>
      <Card>
        <CardContent>
          <Typography variant='h5' component='h2'>
            試すことができるアプリはこちらにて公開されています
            <Link href={marketHTTPSRootUrl.href}>
              <Image
                alt='GGooglePlayStorePage'
                width={646}
                height={250}
                src='https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png'
              />
            </Link>
          </Typography>
        </CardContent>
      </Card>
      <Divider />
      <Card>
        <CardContent>
          <Typography variant='h5' component='h2'>
            以下を使うことでReferrerを取得するサンプルを試すことができます
          </Typography>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Typography component='p'>
                      <b style={{ color: '#FF0000' }}>Google Play Store URL</b>
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography component='p'>
                      <Link href={marketHTTPSInstallReferrerUrl.href}>{marketHTTPSInstallReferrerUrl.href}</Link>
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography component='p'>
                      <b style={{ color: '#FF0000' }}>Google Play Store App URL</b>
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography component='p'>
                      <Link href={marketDeepLinkInstallReferrerUrl.href}>{marketDeepLinkInstallReferrerUrl.href}</Link>
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Input
            placeholder='Referrer Value'
            type='text'
            className='rainbow-p-around_medium'
            onChange={(event) => referrerValueOnChange(event.target.value)}
            value={referrerValue}
          />
        </CardContent>
      </Card>
      <Divider />
      <Card>
        <CardContent>
          <Typography variant='h5' component='h2'>
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
                    <Link href={deepLinkUrl.href}>{deepLinkUrl.href}</Link>
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
                          placeholder='Key'
                          type='text'
                          onChange={(event) => deepLinkParamsKeyOnChange(index, event.target.value)}
                          value={urlPrams.key}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          placeholder='Value'
                          type='text'
                          onChange={(event) => deepLinkParamsValueOnChange(index, event.target.value)}
                          value={urlPrams.value}
                        />
                      </TableCell>
                      <TableCell>
                        <Button onClick={() => deepLinkDeleteParamsButtonOnClick(index)} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Button onClick={deepLinkAddParamsButtonOnClick} />
        </CardContent>
      </Card>
    </main>
  );
}
