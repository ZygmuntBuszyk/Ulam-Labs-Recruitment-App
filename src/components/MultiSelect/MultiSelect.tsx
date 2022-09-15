import { Select as AntSelect } from 'antd';
import styles from './MultiSelect.module.scss';
import { useCallback, useState } from 'react';
import cx from 'classnames';
import { debounce } from 'lodash';
import { IChosenCoin, ICoinData } from '../../services/api/apiModels';
import SelectTag from './SelectTag';

export interface IMultiSelect {
	placeholder?: string;
	data: ICoinData[];
	onSearch?: (searchValue: string) => void;
	onSelect?: (_, data: { label: string; value: string }) => void;
	onDeselect?: (value: string) => void;
	selectedData: IChosenCoin[];
	defaultValue: string[];
}

function MultiSelect({ placeholder, data, onSearch, onSelect, onDeselect, selectedData }: IMultiSelect): React.ReactElement {
	const [isFocused, setIsFocused] = useState<boolean>(false);
	const debounceTime = 500;

	const debounceSearch = useCallback(
		debounce(async (value: string) => onSearch(value), debounceTime),
		[]
	);

	return (
		<AntSelect
			mode='multiple'
			placeholder={placeholder}
			value={selectedData.map(coin => coin.Id)}
			onSelect={onSelect}
			onDeselect={onDeselect}
			tagRender={props => <SelectTag {...{ ...props, selectedData: selectedData }} />}
			onSearch={debounceSearch}
			options={data?.map(option => ({
				value: option?.Id,
				label: option?.Name,
				disabled: selectedData?.length > 4
			}))}
			className={cx(styles.select, {
				[styles['select--active']]: isFocused
			})}
			showSearch
			showArrow={true}
			filterOption={(input, option) =>
				(option.label as string).toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
				(option.label as string).toLowerCase().indexOf(input.toLowerCase()) >= 0
			}
			onFocus={() => setIsFocused(prev => !prev)}
			onBlur={() => setIsFocused(prev => !prev)}
		/>
	);
}

MultiSelect.defaultProps = {
	value: undefined
};

export default MultiSelect;
