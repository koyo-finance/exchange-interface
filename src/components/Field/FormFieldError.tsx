import React from 'react';

export interface FormFieldErrorProps {
	message?: string;
}

const FormFieldError: React.FC<FormFieldErrorProps> = ({ message }) => {
	return <>{message ? <div className="pt-1 pb-2 text-sm italic text-red-600">{message}</div> : null}</>;
};

export default FormFieldError;
