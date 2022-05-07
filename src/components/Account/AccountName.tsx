import { SupportedChainId } from 'constants/chains';
import useENSName from 'hooks/useENSName';
import React from 'react';
import { ExplorerType, formatExplorerLink, shortenHex } from 'utils/utils';

export interface AccountNameProps {
	className?: string;
}

const AccountName: React.FC<AccountNameProps> = ({ className }) => {
	const account = wallet ? wallet.account : null;
	const ens = useENSName(account);

	if (!account) return null;

	return (
		<>
			<a
				href={formatExplorerLink(ExplorerType.Account, [SupportedChainId.BOBA, account])}
				target="_blank"
				rel="noopener noreferrer"
				className={className}
			>
				{ens || shortenHex(account, 4)}
			</a>
		</>
	);
};

export default AccountName;
