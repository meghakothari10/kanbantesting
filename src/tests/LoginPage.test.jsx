import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from './LoginPage';
import '@testing-library/jest-dom/extend-expect';

describe('LoginPage component', () => {
  const mockLogin = jest.fn();
  const defaultProps = {
    login: mockLogin,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render login form', () => {
    const { getByPlaceholderText, getByText } = render(
      <MemoryRouter>
        <LoginPage {...defaultProps} />
      </MemoryRouter>
    );

    expect(getByPlaceholderText('Email')).toBeInTheDocument();
    expect(getByPlaceholderText('Password')).toBeInTheDocument();
    expect(getByText('Login')).toBeInTheDocument();
  });

  it('should call login with valid email and password', async () => {
    const { getByPlaceholderText, getByText } = render(
      <MemoryRouter>
        <LoginPage {...defaultProps} />
      </MemoryRouter>
    );

    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Login');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    await waitFor(() => expect(mockLogin).toHaveBeenCalledTimes(1));
    expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
  });

  it('should show error for invalid email and password', async () => {
    const { getByPlaceholderText, getByText, getByRole } = render(
      <MemoryRouter>
        <LoginPage {...defaultProps} />
      </MemoryRouter>
    );

    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Login');

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.change(passwordInput, { target: { value: 'wrong-password' } });
    fireEvent.click(loginButton);

    await waitFor(() => expect(getByRole('alert')).toBeInTheDocument());
  });

  it('should show error for valid email and invalid password', async () => {
    const { getByPlaceholderText, getByText, getByRole } = render(
      <MemoryRouter>
        <LoginPage {...defaultProps} />
      </MemoryRouter>
    );

    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Login');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrong-password' } });
    fireEvent.click(loginButton);

    await waitFor(() => expect(getByRole('alert')).toBeInTheDocument());
  });

  it('should show error for invalid email and valid password', async () => {
    const { getByPlaceholderText, getByText, getByRole } = render(
      <MemoryRouter>
        <LoginPage {...defaultProps} />
      </MemoryRouter>
    );

    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Login');

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    await waitFor(() => expect(getByRole('alert')).toBeInTheDocument());
  });

  // Additional tests for specific scenarios
  it('should handle empty email and password', async () => {
    const { getByPlaceholderText, getByText, getByRole } = render(
      <MemoryRouter>
        <LoginPage {...defaultProps} />
      </MemoryRouter>
    );

    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Login');

    fireEvent.click(loginButton);

    await waitFor(() => expect(getByRole('alert')).toBeInTheDocument());
  });

  it('should handle email with special characters and valid password', async () => {
    const { getByPlaceholderText, getByText } = render(
      <MemoryRouter>
        <LoginPage {...defaultProps} />
      </MemoryRouter>
    );

    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Login');

    fireEvent.change(emailInput, { target: { value: 'test+example@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    await waitFor(() => expect(mockLogin).toHaveBeenCalledTimes(1));
    expect(mockLogin).toHaveBeenCalledWith('test+example@example.com', 'password123');
  });

  it('should handle long email and valid password', async () => {
    const { getByPlaceholderText, getByText } = render(
      <MemoryRouter>
        <LoginPage {...defaultProps} />
      </MemoryRouter>
    );

    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Login');

    const longEmail = 'test'.repeat(20) + '@example.com';
    fireEvent.change(emailInput, { target: { value: longEmail } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    await waitFor(() => expect(mockLogin).toHaveBeenCalledTimes(1));
    expect(mockLogin).toHaveBeenCalledWith(longEmail, 'password123');
  });
});