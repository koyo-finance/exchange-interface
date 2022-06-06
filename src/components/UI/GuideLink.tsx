import React from 'react';

export interface GuideLinkProps {
	type: string;
	text: string;
	link: string;
}

const GuideLink: React.FC<GuideLinkProps> = ({ type, text, link }) => (
	<div className=" fixed bottom-2 left-2 text-xs font-light text-white md:text-base">
		{text}{' '}
		<a href={link} target="_blank" className=" transform-gpu text-lights-400 underline duration-100 hover:text-lights-300 active:text-lights-200">
			{type} Guide
		</a>
	</div>
);

export default React.memo(GuideLink);
