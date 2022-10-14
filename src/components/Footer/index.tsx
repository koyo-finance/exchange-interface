import { ANALYTICS_LINK, DISCORD_LINK, DOCS_LINK, GITHUB_LINK, TWITTER_LINK } from 'constants/links';
import React from 'react';

const Footer: React.FC = () => {
	return (
		<>
			<div className=" w-full border-darks-500 bg-darks-400 py-6 text-black">
				<div className="container">
					<div className="footer p-10">
						<div>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img src="wide-dark.svg" alt="Koyo wide logo" className="max-h-12" />
						</div>
						<div className="text-lg font-semibold text-white">
							<span className=" text-gray-500">Developers</span>
							{/* eslint-disable-next-line prettier/prettier */}
							<a href={DOCS_LINK} className="link link-hover" target="_blank" rel="noreferrer">
								Documentation
							</a>
							<a href={GITHUB_LINK} className="link link-hover" target="_blank" rel="noreferrer">
								Github
							</a>
							<a href={ANALYTICS_LINK} className="link link-hover" target="_blank" rel="noreferrer">
								Analytics
							</a>
						</div>
						<div className=" text-lg font-semibold text-white">
							<span className=" text-gray-500">Community</span>
							{/* eslint-disable-next-line prettier/prettier */}
							<a href={TWITTER_LINK} className="link link-hover" target="_blank" rel="noreferrer">
								Twitter
							</a>
							<a href={DISCORD_LINK} className="link link-hover" target="_blank" rel="noreferrer">
								Discord
							</a>
						</div>
					</div>
					<hr className="rounded-xl" />
					<div className="footer flex justify-end px-6 pt-2">
						<a href="https://alchemy.com/?r=jYzNzgwNzE1NjgyN" target="_blank" rel="noreferrer">
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								id="badge-button"
								className="btn p-0"
								src="https://static.alchemyapi.io/images/marketing/badgeLight.png"
								alt="Alchemy Supercharged"
							/>
						</a>
					</div>
				</div>
			</div>
		</>
	);
};

export default Footer;
