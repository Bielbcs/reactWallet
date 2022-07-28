// import user from './user';
// import wallet from './wallet';

const INITIAL_STATE = {
  user: {
    email: '',
  },
  wallet: {
    currencies: [],
    expenses: [],
    editor: false,
    idToEdit: 0,
  },
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'EMAIL':
    return {
      ...state,
      user: {
        email: action.payload,
      },
    };
  default:
    return state;
  }
}

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global
