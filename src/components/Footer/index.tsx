import { faDiscord, faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DISCORD_LINK, GITHUB_LINK, TWITTER_LINK } from 'constants/links';
import React from 'react';

const Footer: React.FC = () => {
	return (
		<>
			<div className="border-t-2 border-darks-500 bg-lights-200 py-24 pt-16 text-black">
				<div className="container">
					<div className="footer p-10">
						<div>
							<img src="/wide.svg" alt="Koyo wide logo" className="max-h-9" />
						</div>
						<div>
							<span className="footer-title">Developers</span>
							{/* eslint-disable-next-line prettier/prettier */}
							<a href={GITHUB_LINK} className="link link-hover">
								Github
							</a>
						</div>
						<div className="md:place-self-center md:justify-self-end">
							<div className="flex gap-4 text-4xl">
								<a href={TWITTER_LINK} target="_blank" rel="noopener noreferrer">
									{/* @ts-expect-error This is quite odd */}
									<FontAwesomeIcon icon={faTwitter} />
								</a>
								<a href={GITHUB_LINK} target="_blank" rel="noopener noreferrer">
									{/* @ts-expect-error This is quite odd */}
									<FontAwesomeIcon icon={faGithub} />
								</a>
								<a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer">
									{/* @ts-expect-error This is quite odd */}
									<FontAwesomeIcon icon={faDiscord} />
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Footer;
