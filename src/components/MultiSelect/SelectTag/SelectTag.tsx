import { CustomTagProps } from 'rc-select/lib/BaseSelect';
import { Tag as AntTag } from 'antd';
import { IChosenCoin } from '../../../services/api/apiModels';

interface ITagProps extends CustomTagProps {
	selectedData: IChosenCoin[];
}

function SelectTag({ label, value, closable, onClose, selectedData }: ITagProps): React.ReactElement {
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
}

export default SelectTag;
