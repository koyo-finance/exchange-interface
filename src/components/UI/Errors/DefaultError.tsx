import React from 'react';

export interface DefaultErrorProps {
	message: string;
}

const DefaultError: React.FC<DefaultErrorProps> = ({ message }) => {
	return <div className="text-center text-lg text-red-600">{message}</div>;
};

export default DefaultError;
