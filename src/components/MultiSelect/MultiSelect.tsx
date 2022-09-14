import { Select as AntSelect, Tag as AntTag } from 'antd';
import styles from './MultiSelect.module.scss';
import { useState } from 'react';
import cx from 'classnames';
import { debounce } from 'lodash';
import { IChosenCoin, ICoinData } from '../../services/api/apiModels';
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';

export interface IMultiSelect {
	placeholder?: string;
	data: ICoinData[];
	onChange?: () => void;
	onSearch?: (searchValue: string) => void;
	onSelect?: (_, data: { label: string; value: string }) => void;
	onDeselect?: (value: string) => void;
	selectedData: IChosenCoin[];
	defaultValue: string[];
}

function MultiSelect({ placeholder, data, onChange, onSearch, onSelect, onDeselect, selectedData }: IMultiSelect): React.ReactElement {
	const [isFocused, setIsFocused] = useState<boolean>(false);

	const tagRender = (props: CustomTagProps) => {
		const { label, value, closable, onClose } = props;
		const color = selectedData.find(data => data.Id === value).Color;
		const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
			event.preventDefault();
			event.stopPropagation();
		};

		return (
			<AntTag color={color} onMouseDown={onPreventMouseDown} closable={closable} onClose={onClose} style={{ marginRight: 3 }}>
				{label}
			</AntTag>
		);
	};

	return (
		<AntSelect
			mode='multiple'
			placeholder={placeholder}
			value={selectedData.map(coin => coin.Id)}
			onChange={onChange}
			onSelect={onSelect}
			onDeselect={onDeselect}
			tagRender={tagRender}
			onSearch={value => debounce(onSearch, 500)(value)} // todo make it work
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
