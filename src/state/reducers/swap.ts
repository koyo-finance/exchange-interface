import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'state';

export interface SwapState {
	momiji: boolean;
}

const initialState: SwapState = {
	momiji: false
};

export const swapSlice = createSlice({
	name: 'Swap',
	initialState,
	reducers: {
		setMomijiUsage(state, action: PayloadAction<boolean>) {
			state.momiji = action.payload;
		}
	}
});

export const { setMomijiUsage } = swapSlice.actions;

export const selectMomijiUsage = (state: RootState) => state.swap.momiji;

export default swapSlice.reducer;
