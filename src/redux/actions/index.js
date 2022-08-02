import fetchCurrenciesAPI from '../../services';

export const saveEmailAction = (payload) => ({ type: 'EMAIL', payload });

const getWalletAPI = (payload) => ({ type: 'WALLET_LIST', payload });

export const saveExpenseAction = (payload) => ({ type: 'EXPENSE_LIST', payload });

export const deleteItem = (payload) => ({ type: 'DELETE_ITEM', payload });

export const editItem = (payload) => ({ type: 'EDIT_ITEM', payload });

export const finishEditionAction = (payload) => ({ type: 'FINISH_EDITION', payload });

export const requestWalletThunk = () => async (dispatch) => {
  const reponse = await fetchCurrenciesAPI();
  const currencies = (Object.keys(reponse).filter((item) => item !== 'USDT'));
  dispatch(getWalletAPI(currencies));
};
