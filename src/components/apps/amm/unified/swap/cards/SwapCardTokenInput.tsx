import { FieldProps } from 'formik';
import React from 'react';

const SwapCardTokenInput: React.FC<FieldProps> = ({ field, form, ...props }) => {
	return (
		<input
			type="number"
			className="w-full bg-darks-500 font-jtm text-3xl font-extralight text-white outline-none md:text-4xl"
			{...field}
			{...props}
		/>
	);
};

export default SwapCardTokenInput;
