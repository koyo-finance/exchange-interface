import React, { useState } from 'react';
import { HelpCircle } from 'react-feather';

const BAD_SRCS: { [tokenAddress: string]: true } = {};

export interface FallbackCurrencyIconProps
	extends Pick<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, 'style' | 'alt' | 'className'> {
	srcs: string[];
}

const FallbackCurrencyIcon: React.FC<FallbackCurrencyIconProps> = ({ srcs, alt, ...rest }) => {
	const [, refresh] = useState<number>(0);

	const src: string | undefined = srcs.find((src) => !BAD_SRCS[src]);

	if (src) {
		return (
			// eslint-disable-next-line @next/next/no-img-element
			<img
				{...rest}
				alt={alt}
				src={src}
				onError={() => {
					if (src) BAD_SRCS[src] = true;
					refresh((i) => i + 1);
				}}
			/>
		);
	}

	return <HelpCircle {...rest} className={`${rest.className} !bg-white !text-gray-500`} />;
};

export default FallbackCurrencyIcon;
