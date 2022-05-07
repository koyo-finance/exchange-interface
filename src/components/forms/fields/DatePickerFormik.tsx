import { FieldInputProps, useField, useFormikContext } from 'formik';
import React from 'react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export interface DatePickerFormikProps
	extends Pick<FieldInputProps<any>, 'value' | 'onChange'>,
		Pick<ReactDatePickerProps, 'minDate' | 'minTime' | 'maxTime' | 'showTimeSelect' | 'inline' | 'dateFormat'> {
	name: string;
	className?: string;
}

const DatePickerFormik: React.FC<DatePickerFormikProps> = ({ ...props }) => {
	const { setFieldValue } = useFormikContext();
	const [field] = useField(props);

	return (
		<DatePicker
			{...props}
			{...field}
			className={`unreset ${props.className || ''}`}
			selected={(field.value && new Date(field.value)) || null}
			onChange={(val) => {
				setFieldValue(field.name, val);
			}}
		/>
	);
};

export default DatePickerFormik;
