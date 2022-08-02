import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Login', () => {
  it('verify login inputs', () => {
    renderWithRouterAndRedux(<App />);
    
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByText('Entrar')).toBeInTheDocument();
  });
  it('redirect is correct', () => {
    const { history } = renderWithRouterAndRedux(<App />)

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const button = screen.getByText('Entrar');

    userEvent.type(emailInput, 'trybe@teste.com');
    userEvent.type(passwordInput, '123456');
    userEvent.click(button);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/carteira')
  });
});