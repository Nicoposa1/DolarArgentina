import { createSlice } from '@reduxjs/toolkit';
import { CurrencyData } from '../../interfaces/Home';


interface CoinsState {
  coins: any[];
  dolarBlue: CurrencyData;
}

const initialState: CoinsState = {
  coins: [],
  dolarBlue: {} as CurrencyData,
};

const coinsSlice = createSlice({
  name: 'coins',
  initialState,
  reducers: {
    setCoins: (state, action) => {
      state.coins = action.payload;
    },
    setDolarBlue: (state, action) => {
      state.dolarBlue = action.payload;
    },
  },
});

export const {
  setCoins,
  setDolarBlue,
} = coinsSlice.actions;
export default coinsSlice.reducer;
