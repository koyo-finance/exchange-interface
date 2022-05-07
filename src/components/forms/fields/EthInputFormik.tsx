import { FieldInputProps, useField } from 'formik';
import React from 'react';

export interface EthInputFormikProps extends Pick<FieldInputProps<any>, 'value' | 'onChange'> {
	name: string;
	className?: string;
}

const EthInputFormik: React.FC<EthInputFormikProps> = ({ ...props }) => {
	const [field] = useField(props);

	return (
		<div>
			<img src="/assets/icons/ether_white.svg" alt="Ether" className="inline pr-1" />
			<input type="text" {...props} {...field} />
		</div>
	);
};

export default EthInputFormik;
