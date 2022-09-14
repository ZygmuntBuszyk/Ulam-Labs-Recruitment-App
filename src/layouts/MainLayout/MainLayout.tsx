import { Layout } from 'antd';
import React, { ReactNode, useEffect } from 'react';
import styles from './MainLayout.module.scss';
import responseInterceptor from '../../services/api/interceptors/responseInterceptor';

interface IMainLayoutProps {
	children: ReactNode;
}

function MainLayout({ children }: IMainLayoutProps) {
	useEffect(() => {
		responseInterceptor();
	}, []);

	return (
		<Layout>
			{/*<LoadingBar className={styles.loader} color='#2e77ff' progress={progress} onLoaderFinished={() => setProgress(0)} />*/}

			{/*<Layout.Header className={cx(styles.header, { [styles['header--hidden']]: !visible && windowWidth < 868 })}>*/}
			{/*</Layout.Header>*/}

			<Layout.Content>
				<div className={styles.main}>
					<div className={styles['main-content__children']}>{children}</div>
				</div>
				{/*<Layout.Footer className={styles.footer}>*/}
				{/*	<Footer />*/}
				{/*</Layout.Footer>*/}
			</Layout.Content>
		</Layout>
	);
}

export default MainLayout;
