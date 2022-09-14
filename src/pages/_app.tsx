import type { AppProps } from 'next/app';
import 'antd/dist/antd.css';
import { PersistGate } from 'redux-persist/integration/react';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { store, persistor } from 'state/store';
import PageWithLayoutType from 'layouts/PageWithLayoutType';
import * as React from 'react';

interface IAppLayoutProps extends AppProps {
	Component: PageWithLayoutType;
	pageProps: any;
}

function RecruitmentApp({ Component, pageProps }: IAppLayoutProps) {
	const Layout = Component.Layout || React.Fragment;

	return (
		<>
			<Head>
				<title>Ulam Labs Recruitment App</title>
				<link rel='icon' href='/favicon.ico' />
				<meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' />
			</Head>

			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</PersistGate>
			</Provider>
		</>
	);
}

export default RecruitmentApp;
