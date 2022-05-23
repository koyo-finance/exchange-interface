import { DOCS_LINK, GITHUB_LINK, TWITTER_LINK } from 'constants/links';
import React from 'react';

const Footer: React.FC = () => {
	return (
		<>
			<div className=" w-full border-darks-500 bg-darks-500 py-6 text-black">
				<div className="container">
					<div className="footer p-10">
						<div>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img src="/wide-dark.svg" alt="Koyo wide logo" className="max-h-12" />
						</div>
						<div className=" text-lg font-semibold text-white">
							<span className=" text-gray-500">Developers</span>
							{/* eslint-disable-next-line prettier/prettier */}
							<a href={DOCS_LINK} className="link link-hover" target="_blank" rel="noreferrer">
								Documentation
							</a>
							<a href={GITHUB_LINK} className="link link-hover" target="_blank" rel="noreferrer">
								Github
							</a>
						</div>
						<div className=" text-lg font-semibold text-white">
							<span className=" text-gray-500">Community</span>
							{/* eslint-disable-next-line prettier/prettier */}
							<a href={TWITTER_LINK} className="link link-hover" target="_blank" rel="noreferrer">
								Twitter
							</a>
						</div>
						{/* <div className="md:place-self-center md:justify-self-end">
							<div className="flex gap-4 text-4xl">
								<a href={TWITTER_LINK} target="_blank" rel="noopener noreferrer">
									@ts-expect-error This is quite odd
									<FontAwesomeIcon icon={faTwitter} />
								</a>
								<a href={GITHUB_LINK} target="_blank" rel="noopener noreferrer">
									@ts-expect-error This is quite odd
									<FontAwesomeIcon icon={faGithub} />
								</a>
								<a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer">
									@ts-expect-error This is quite odd
									<FontAwesomeIcon icon={faDiscord} />
								</a>
							</div>
						</div>  */}
					</div>
				</div>
			</div>
		</>
	);
};

export default Footer;
