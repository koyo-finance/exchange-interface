import { FieldInputProps, useField } from 'formik';
import React from 'react';

export interface SimpleDaysInputFormikProps extends Pick<FieldInputProps<any>, 'value' | 'onChange'> {
	name: string;
	className?: string;
	classNameField?: string;
}

const SimpleDaysInputFormik: React.FC<SimpleDaysInputFormikProps> = ({ ...props }) => {
	const [field] = useField(props);

	return (
		<span className={props.className}>
			{' '}
			<input type="text" {...props} {...field} className={props.classNameField} /> day(s)
		</span>
	);
};

export default SimpleDaysInputFormik;
