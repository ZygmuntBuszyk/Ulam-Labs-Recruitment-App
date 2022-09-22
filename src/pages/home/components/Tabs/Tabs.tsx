import styles from './Tabs.module.scss';
import { Tabs } from 'antd';
import { useCallback, useMemo } from 'react';
import { appOperations, appSelectors } from 'state/ducks/app';
import { useDispatch, useSelector } from 'react-redux';
import { IChosenCoin } from '../../../../services/api/apiModels';
import TabContent from '../TabContent';

interface ITabsPanelProps {
	chosenCoins: IChosenCoin[];
}

function TabsPanel({ chosenCoins }: ITabsPanelProps) {
	const dispatch = useDispatch();
	const activeTab = useSelector(appSelectors.getActiveTab);

	const items = useMemo(
		() =>
			chosenCoins?.map(coin => ({
				label: coin.Name,
				children: <TabContent coin={coin} />,
				key: coin.Id
			})),
		[chosenCoins]
	);

	const remove = useCallback(
		(targetKey: string) => {
			const targetIndex = chosenCoins.findIndex(pane => pane.Id === targetKey);
			const newPanes = chosenCoins.filter(pane => pane.Id !== targetKey);

			if (newPanes.length && targetKey === activeTab) {
				const { Id } = newPanes[targetIndex === newPanes.length ? targetIndex - 1 : targetIndex];

				dispatch(appOperations.setActiveTab(Id));
			}

			dispatch(appOperations.removeChosenCoin(targetKey));
		},
		[chosenCoins]
	);

	return (
		<Tabs
			hideAdd
			className={styles.Tabs}
			onChange={Id => dispatch(appOperations.setActiveTab(Id))}
			activeKey={activeTab || chosenCoins[0]?.Id}
			type='editable-card'
			onEdit={remove}
			items={items}
		/>
	);
}

export default TabsPanel;
