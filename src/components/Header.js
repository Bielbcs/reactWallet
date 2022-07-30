import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Header extends Component {
  pegaNumeros = () => {
    const { expenses } = this.props;
    let total = 0;
    expenses.forEach(({ value, exchangeRates, currency }) => {
      total += Number(value) * exchangeRates[currency].ask;
    });
    return total.toFixed(2);
  };

  render() {
    const { email } = this.props;
    this.pegaNumeros();
    return (
      <div>
        <span data-testid="email-field">{ email }</span>
        <span data-testid="total-field">{this.pegaNumeros()}</span>
        <span data-testid="header-currency-field">BRL</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: propTypes.string.isRequired,
  expenses: propTypes.arrayOf(propTypes.any).isRequired,
};

export default connect(mapStateToProps)(Header);
