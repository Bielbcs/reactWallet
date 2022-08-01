import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { requestWalletThunk, saveExpenseAction } from '../redux/actions';
import fetchCurrenciesAPI from '../services';

class WalletForm extends Component {
  state = {
    valueInput: '',
    description: '',
    currency: '',
    method: '',
    tag: '',
  };

  componentDidMount() {
    const { getWalletList } = this.props;
    getWalletList();
  }

  onInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.type === 'checkbox'
      ? event.target.checked : event.target.value });
  };

  shouldButtonDisable = () => {
    const { valueInput, description, currency, method, tag } = this.state;
    const statesArray = [valueInput, description, currency, method, tag];
    if (statesArray.some((state) => state === '')) return true;
    return false;
  }

  resetAllInputs = () => {
    this.setState({
      valueInput: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    });
  }

  saveOnGlobalState = async (e) => {
    e.preventDefault();
    const { saveExpense, expenses } = this.props;
    const response = await fetchCurrenciesAPI();
    const { valueInput, description, currency, tag, method } = this.state;
    const objToSave = {
      id: expenses.length,
      value: valueInput,
      description,
      currency,
      method,
      tag,
      exchangeRates: response,
    };

    saveExpense(objToSave);
    this.resetAllInputs();
  }

  render() {
    const { currenciesList } = this.props;
    const { valueInput, description, currency, tag, method } = this.state;
    return (
      <div>
        <form>

          <label htmlFor="value">
            Valor:
            <input
              type="number"
              id="value"
              name="valueInput"
              value={ valueInput }
              data-testid="value-input"
              onChange={ this.onInputChange }
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              type="text"
              name="description"
              value={ description }
              id="description"
              data-testid="description-input"
              onChange={ this.onInputChange }
            />
          </label>

          <select
            name="currency"
            id="currency"
            value={ currency }
            data-testid="currency-input"
            onChange={ this.onInputChange }
          >
            <option>Selecione uma moeda...</option>
            {currenciesList.map((currencie) => (
              <option
                key={ currencie }
                value={ currencie }
              >
                {currencie}
              </option>))}
          </select>

          <select
            name="method"
            id="method"
            value={ method }
            data-testid="method-input"
            onChange={ this.onInputChange }
          >
            <option>Selecione um metódo...</option>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>

          <select
            name="tag"
            id="category"
            data-testid="tag-input"
            value={ tag }
            onChange={ this.onInputChange }
          >
            <option>Selecione uma tag...</option>
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>

          <button
            type="submit"
            onClick={ this.saveOnGlobalState }
            disabled={ this.shouldButtonDisable() }
          >
            Adicionar despesa
          </button>

        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currenciesList: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getWalletList: () => dispatch(requestWalletThunk()),
  saveExpense: (payload) => dispatch(saveExpenseAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);

WalletForm.propTypes = {
  getWalletList: propTypes.func.isRequired,
  currenciesList: propTypes.arrayOf(propTypes.any).isRequired,
  saveExpense: propTypes.func.isRequired,
  expenses: propTypes.arrayOf(propTypes.any).isRequired,
};
