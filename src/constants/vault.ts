import { ExitKind } from 'constants/ExitKind';
import { JoinKind } from 'constants/JoinKind';

export const JOIN_KIND_ABI_STRUCTURE: { [kind in JoinKind]: string[] } = {
	[JoinKind.INIT]: ['uint256', 'uint256[]'],
	[JoinKind.EXACT_TOKENS_IN_FOR_BPT_OUT]: ['uint256', 'uint256[]', 'uint256'],
	[JoinKind.TOKEN_IN_FOR_EXACT_BPT_OUT]: ['uint256', 'uint256', 'uint256'],
	[JoinKind.ALL_TOKENS_IN_FOR_EXACT_BPT_OUT]: ['uint256', 'uint256']
};

export const EXIT_KIND_ABI_STRUCTURE: { [kind in ExitKind]: string[] } = {
	[ExitKind.EXACT_BPT_IN_FOR_ONE_TOKEN_OUT]: ['uint256', 'uint256', 'uint256'],
	[ExitKind.EXACT_BPT_IN_FOR_TOKENS_OUT]: ['uint256', 'uint256'],
	[ExitKind.BPT_IN_FOR_EXACT_TOKENS_OUT]: ['uint256', 'uint256[]', 'uint256'],
	[ExitKind.MANAGEMENT_FEE_TOKENS_OUT]: [] // unimplemented
};
