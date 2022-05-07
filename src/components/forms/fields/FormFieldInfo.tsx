import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Tooltip } from 'react-tippy';

export interface FormFieldInfoProps {
	message?: string;
	iconClassName?: string;
}

const FormFieldInfo: React.FC<FormFieldInfoProps> = ({ message, iconClassName }) => {
	return (
		<span className="pl-2">
			<Tooltip title={message}>
				{/* @ts-expect-error This is quite odd */}
				<FontAwesomeIcon icon={faInfoCircle} className={iconClassName} />
			</Tooltip>
		</span>
	);
};

export default FormFieldInfo;
