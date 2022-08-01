import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { deleteItem, editItem } from '../redux/actions';

class DeleteButton extends Component {
  deleteFunction = () => {
    const { data, expenses, delItem } = this.props;
    const newExpenses = expenses.filter((exp) => exp.id !== data.id);
    delItem(newExpenses);
  };

  editFunction = () => {
    const { data, editI } = this.props;
    editI(data.id);
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
        <button
          type="button"
          data-testid="edit-btn"
          onClick={ this.editFunction }
        >
          Editar
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
  editI: (payload) => dispatch(editItem(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteButton);

DeleteButton.propTypes = {
  data: propTypes.objectOf(propTypes.any).isRequired,
  expenses: propTypes.arrayOf(propTypes.any).isRequired,
  delItem: propTypes.func.isRequired,
  editI: propTypes.func.isRequired,
};
