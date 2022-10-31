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
      <td className="buttons-container">
        <button
          type="button"
          data-testid="edit-btn"
          className="btn btn-secondary"
          onClick={ this.editFunction }
        >
          Editar
        </button>
        <button
          key={ data.id }
          data-testid="delete-btn"
          style={ { marginLeft: '5px' } }
          type="button"
          onClick={ this.deleteFunction }
          className="btn btn-danger"
        >
          Deletar
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
