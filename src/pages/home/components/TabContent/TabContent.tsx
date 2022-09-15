import styles from './TabContent.module.scss';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { appOperations, appSelectors } from 'state/ducks/app';
import { useDispatch, useSelector } from 'react-redux';
import { IChosenCoin } from '../../../../services/api/apiModels';
import { Line } from '@ant-design/plots';
import { formatCurrency } from '@coingecko/cryptoformat';
import dayjs from 'dayjs';

interface ITabContentPanelProps {
	coin: IChosenCoin;
}

function TabContent({ coin }: ITabContentPanelProps) {
	const dispatch = useDispatch();
	const prices = useSelector(appSelectors.getMarketData(coin.Id));
	const currentPrice = useMemo(() => prices?.length && formatCurrency(prices[prices?.length - 1][1], 'USD', 'en'), [prices]);

	const [data, setData] = useState([]);

	useEffect(() => {
		if (prices?.length) {
			const priceData = [...prices];
			const mappedData = priceData.map(([date, price]) => ({
				date: dayjs(date).format('DD. MMM, HH:mm'),
				price: price
			}));

			setData(mappedData);
		}
	}, [prices]);

	useEffect(() => {
		dispatch(
			appOperations.getCoinMarketData({
				coinId: coin.Id,
				vsCurrency: 'usd',
				daysAgo: 1,
				interval: '1h'
			})
		);
	}, [coin]);

	const getYAxisMinMaxConfig = useCallback(() => {
		const mappedData = [...prices].map(([date, price]) => price);

		const min = mappedData.reduce(function (p, v) {
			return p < v ? p : v;
		});

		const max = mappedData.reduce(function (p, v) {
			return p > v ? p : v;
		});
		return {
			max,
			min
		};
	}, [prices]);

	return (
		<div className={styles.TabContent}>
			<h1>
				Recent price: <span style={{ color: coin.Color }}> {currentPrice}$ </span>
			</h1>
			{prices?.length && (
				<Line
					{...{
						data,
						xField: 'date',
						yField: 'price',
						xAxis: {
							tickCount: prices?.length,
							label: {
								formatter: v => `${dayjs(v).format('HH:mm')}`
							}
						},
						yAxis: {
							nice: true,
							...getYAxisMinMaxConfig()
						},
						width: '100%',
						color: coin.Color
					}}
				/>
			)}
		</div>
	);
}

export default TabContent;
