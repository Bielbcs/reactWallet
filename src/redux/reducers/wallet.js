const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'WALLET_LIST':
    return {
      ...state,
      currencies: action.payload,
    };
  case 'EXPENSE_LIST':
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case 'DELETE_ITEM':
    return {
      ...state,
      expenses: action.payload,
    };
  case 'EDIT_ITEM':
    return {
      ...state,
      editor: true,
      idToEdit: action.payload,
    };
  case 'FINISH_EDITION':
    return {
      ...state,
      editor: false,
      expenses: action.payload,
    };
  default:
    return state;
  }
};

export default wallet;
