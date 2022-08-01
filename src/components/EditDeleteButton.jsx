import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { deleteItem } from '../redux/actions';

class EditDeleteButton extends Component {
  deleteFunction = () => {
    const { data, expenses, delItem } = this.props;
    const newExpenses = expenses.filter((exp) => exp.id !== data.id);
    console.log(newExpenses);
    delItem(newExpenses);
  };

  render() {
    const { data } = this.props;

    return (
      <td>
        <button
          key={ data.id }
          data-testid="delete-btn"
          type="button"
          onClick={ this.deleteFunction }
        >
          Delete
        </button>
      </td>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  delItem: (payload) => dispatch(deleteItem(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditDeleteButton);

EditDeleteButton.propTypes = {
  data: propTypes.objectOf(propTypes.any).isRequired,
  expenses: propTypes.arrayOf(propTypes.any).isRequired,
  delItem: propTypes.func.isRequired,
};
