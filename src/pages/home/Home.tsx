import styles from './Home.module.scss';
import MainLayout from 'layouts/MainLayout';
import MultiSelect from 'components/MultiSelect';
import TabsPanel from './components/Tabs';
import { appSelectors, appOperations } from 'state/ducks/app';
import { useDispatch, useSelector } from 'react-redux';
import { getRandomColor } from '../../shared/functions';

function Home() {
	const dispatch = useDispatch();
	const coinsData = useSelector(appSelectors.getCoins);
	const chosenCoins = useSelector(appSelectors.getChosenCoins);
	const activeTab = useSelector(appSelectors.getActiveTab);

	return (
		<div className={styles.home}>
			<h1>ULAM LABS RECRUITMENT APP</h1>

			<div className={styles['home-container']}>
				<div className={styles['home-container__select']}>
					<MultiSelect
						placeholder={'Enter your cryptocurrency..'}
						onSearch={value => dispatch(appOperations.searchCoins(value))}
						data={coinsData}
						onSelect={(_, { label, value }) => {
							dispatch(
								appOperations.setChosenCoin({
									Id: value,
									Name: label,
									Color: getRandomColor()
								})
							);

							dispatch(appOperations.setActiveTab(value));
						}}
						selectedData={chosenCoins}
						onDeselect={id => {
							// todo: Refactor to operation
							dispatch(appOperations.removeChosenCoin(id));

							const targetIndex = chosenCoins.findIndex(pane => pane.Id === id);
							const newPanes = chosenCoins.filter(pane => pane.Id !== id);

							if (newPanes.length && id === activeTab) {
								const { Id } = newPanes[targetIndex === newPanes.length ? targetIndex - 1 : targetIndex];

								dispatch(appOperations.setActiveTab(Id));
							}
						}}
					/>
				</div>

				<div className={styles['home-container__row-panel']}>
					<TabsPanel chosenCoins={chosenCoins} />
				</div>
			</div>
		</div>
	);
}

Home.Layout = MainLayout;

export default Home;
