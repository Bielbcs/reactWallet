import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { finishEditionAction,
  requestWalletThunk, saveExpenseAction } from '../redux/actions';
import fetchCurrenciesAPI from '../services';
import '../styles/WalletForm.css';

class WalletForm extends Component {
  state = {
    valueInput: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { getWalletList } = this.props;
    getWalletList();
  }

  onInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  resetAllInputs = () => {
    this.setState({
      valueInput: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
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

  editExpense = (e) => {
    e.preventDefault();
    const { expenses, idToEdit, finishEdition } = this.props;
    const { valueInput, description, currency, tag, method } = this.state;
    const newExpense = expenses.map((exp) => {
      if (exp.id === idToEdit) {
        exp.value = valueInput;
        exp.description = description;
        exp.currency = currency;
        exp.method = method;
        exp.tag = tag;
      }
      return exp;
    });
    finishEdition(newExpense);
    this.resetAllInputs();
  }

  render() {
    const { currenciesList, editor } = this.props;
    const { valueInput, description, currency, tag, method } = this.state;

    return (
      <div>
        <form className="wallet-form-container" autoComplete="off">
          <div className="inputs-container">
            <label className="form-label" htmlFor="value">
              <input
                className="form-control"
                placeholder="Valor"
                type="number"
                id="value"
                name="valueInput"
                value={ valueInput }
                data-testid="value-input"
                onChange={ this.onInputChange }
              />
            </label>
            <label className="form-label" htmlFor="description">
              <input
                className="form-control"
                type="text"
                placeholder="Descrição"
                name="description"
                value={ description }
                id="description"
                data-testid="description-input"
                onChange={ this.onInputChange }
              />
            </label>

            <select
              name="currency"
              className="btn btn-secondary dropdown-toggle"
              id="currency"
              value={ currency }
              data-testid="currency-input"
              onChange={ this.onInputChange }
            >
              {currenciesList.map((currencie) => (
                <option
                  className="dropdown-item"
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
              className="btn btn-secondary dropdown-toggle"
              data-testid="method-input"
              onChange={ this.onInputChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>

            <select
              name="tag"
              id="category"
              data-testid="tag-input"
              className="btn btn-secondary dropdown-toggle"
              value={ tag }
              onChange={ this.onInputChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </div>

          <button
            type="submit"
            onClick={ !editor ? this.saveOnGlobalState : this.editExpense }
            className="btn btn-warning test"
          >
            { editor ? 'Editar despesa' : 'Adicionar despesa' }
          </button>

        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currenciesList: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  getWalletList: () => dispatch(requestWalletThunk()),
  saveExpense: (payload) => dispatch(saveExpenseAction(payload)),
  finishEdition: (payload) => dispatch(finishEditionAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);

WalletForm.propTypes = {
  getWalletList: propTypes.func.isRequired,
  currenciesList: propTypes.arrayOf(propTypes.any).isRequired,
  saveExpense: propTypes.func.isRequired,
  editor: propTypes.bool.isRequired,
  expenses: propTypes.arrayOf(propTypes.any).isRequired,
  idToEdit: propTypes.number.isRequired,
  finishEdition: propTypes.func.isRequired,
};
