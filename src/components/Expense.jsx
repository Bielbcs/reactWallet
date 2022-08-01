import React, { Component } from 'react';
import propTypes from 'prop-types';

export default class Expense extends Component {
  render() {
    const { data } = this.props;
    const { exchangeRates } = data;
    const specificExchange = exchangeRates[data.currency];
    const convertedValue = Number(data.value) * specificExchange.ask;

    return (
      <tbody>
        <tr>
          <td>{data.description}</td>
          <td>{ data.tag }</td>
          <td>{ data.method }</td>
          <td>{ Number(data.value).toFixed(2) }</td>
          <td>{ specificExchange.name }</td>
          <td>{ specificExchange.code }</td>
          <td>{ Number(specificExchange.ask).toFixed(2) }</td>
          <td>Real</td>
          <td>{ convertedValue.toFixed(2) }</td>
        </tr>
      </tbody>
    );
  }
}

Expense.propTypes = {
  data: propTypes.objectOf(propTypes.any).isRequired,
};
