import fetchCurrenciesAPI from '../../services';

export const saveEmailAction = (payload) => ({
  type: 'EMAIL',
  payload,
});

const getWalletAPI = (payload) => ({
  type: 'WALLET_LIST',
  payload,
});

export const requestWalletThunk = () => async (dispatch) => {
  const currencies = await fetchCurrenciesAPI();
  const teste = (Object.keys(currencies).filter((item) => item !== 'USDT'));
  dispatch(getWalletAPI(teste));
};
