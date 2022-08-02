import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';

const mockedWallet = {
  wallet: {
    currencies: [
      Object.keys(mockData)
    ],
    expenses: [
      {
        id: 0,
        value: '1',
        description: 'Teste',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Lazer',
        exchangeRates: mockData,
      },
      {
        id: 1,
        value: '2',
        description: 'Teste',
        currency: 'CAD',
        method: 'Cartão de crédito',
        tag: 'Trabalho',
        exchangeRates: mockData,
      }
    ],
    editor: false,
    idToEdit: 0,
  }
}

describe('Wallet', () => {
  it('email should appear on the screen', () => {
    const initialStateMock = {
      user: {
        email: 'trybe@teste.com',
      }
    }

    renderWithRouterAndRedux(<Wallet />, { initialState: initialStateMock });

    const email = screen.getByTestId('email-field');
    
    expect(email).toBeInTheDocument();
    expect(email.textContent).toBe('trybe@teste.com');
  });
  it('add button should to be working', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const value = screen.getByTestId('value-input');
    const description = screen.getByTestId('description-input');
    const currency = screen.getByTestId('currency-input');
    const method = screen.getByTestId('method-input');
    const tag = screen.getByTestId('tag-input');
    const button = screen.getByRole('button', { name: 'Adicionar despesa' });

    userEvent.type(value, 1);
    userEvent.type(description, 'teste2');
    userEvent.click(method);
    userEvent.click(currency);
    userEvent.click(await screen.findByText('USD'));
    userEvent.click(screen.getAllByText('Dinheiro')[0]);
    userEvent.click(tag);
    userEvent.click(screen.getAllByText('Lazer')[0]);
    userEvent.click(button);

    const text = await screen.findByText('teste2');

    expect(text).toBeInTheDocument();

  });
  it('delete button should to be working', () => {
    renderWithRouterAndRedux(<Wallet />, { initialState: mockedWallet });

    userEvent.click(screen.getAllByText('Delete')[0]);
    expect(screen.getAllByText('Teste').length).toBe(1);
  });
  it('edit button should to be working', () => {
    renderWithRouterAndRedux(<Wallet />, { initialState: mockedWallet });

    userEvent.click(screen.getAllByText('Editar')[0]);
    userEvent.type(screen.getByTestId('value-input'), '10');
    userEvent.click(screen.getByRole('button', { name: 'Editar despesa' }))

    expect(screen.getByText('10.00')).toBeInTheDocument();
  });
});
