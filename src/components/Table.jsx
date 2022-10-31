import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Expense from './Expense';
import '../styles/Table.css';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <table className="table table-dark table-striped table-hover">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        { expenses.map((exp, index) => <Expense key={ index } data={ exp } />) }
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: propTypes.arrayOf(propTypes.any).isRequired,
};

export default connect(mapStateToProps)(Table);
