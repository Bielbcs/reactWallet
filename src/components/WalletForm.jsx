import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { requestWalletThunk } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { getWalletList } = this.props;
    getWalletList();
  }

  render() {
    const { currenciesList } = this.props;
    console.log(currenciesList);
    return (
      <div>
        <form>

          <label htmlFor="value">
            <input type="number" id="value" data-testid="value-input" />
          </label>
          <label htmlFor="description">
            <input
              type="text"
              name="description"
              id="description"
              data-testid="description-input"
            />
          </label>

          <select name="currency" id="currency" data-testid="currency-input">
            {currenciesList.map((currencie) => (
              <option
                key={ currencie }
                value={ currencie }
              >
                {currencie}
              </option>))}
          </select>

          <select name="method" id="method" data-testid="method-input">
            <option value="method">Dinheiro</option>
            <option value="method">Cartão de crédito</option>
            <option value="method">Cartão de débito</option>
          </select>

          <select name="category" id="category" data-testid="tag-input">
            <option value="category">Alimentação</option>
            <option value="category">Lazer</option>
            <option value="category">Trabalho</option>
            <option value="category">Transporte</option>
            <option value="category">Saúde</option>
          </select>

        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currenciesList: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getWalletList: () => dispatch(requestWalletThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);

WalletForm.propTypes = {
  getWalletList: propTypes.func.isRequired,
  currenciesList: propTypes.arrayOf(propTypes.any).isRequired,
};
