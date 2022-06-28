import React, { useMemo, useState } from 'react';
import { HelpCircle } from 'react-feather';

export interface FallbackCurrencyIconProps
	extends Pick<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, 'style' | 'alt' | 'className'> {
	srcs: string[];
}

const FallbackCurrencyIcon: React.FC<FallbackCurrencyIconProps> = ({ srcs, alt, ...rest }) => {
	const [fallback, setFallback] = useState<boolean>(false);

	const src = useMemo(() => {
		setFallback(false);
		return srcs[0];
	}, [srcs]);

	if (fallback) return <HelpCircle {...rest} className={`${rest.className} !bg-white !text-gray-500`} />;

	return (
		// eslint-disable-next-line @next/next/no-img-element
		<img
			{...rest}
			alt={alt}
			src={src}
			onError={() => {
				setFallback(true);
			}}
		/>
	);
};

export default FallbackCurrencyIcon;
