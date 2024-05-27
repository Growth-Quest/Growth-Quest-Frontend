import '@testing-library/jest-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import LoginWeb from '../../components/LoginWeb';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
  },
}));
describe('LoginWeb', () => {

  let logSpy: any;

  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log');
    localStorage.clear();
    jest.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('should render the login form', () => {
    const { getByText, getByLabelText, getByRole } = render(
      <Router>
        <LoginWeb />
      </Router>
    );

    expect(getByRole('button', { name: "Login" })).toBeInTheDocument();
    expect(getByLabelText('Username:')).toBeInTheDocument();
    expect(getByLabelText('Password:')).toBeInTheDocument();
    expect(getByText("Don't have an account?")).toBeInTheDocument();
  });

  it('should handle input changes', () => {
    const { getByLabelText } = render(
      <Router>
        <LoginWeb />
      </Router>
    );

    const usernameInput = getByLabelText('Username:');
    const passwordInput = getByLabelText('Password:');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    expect(usernameInput).toHaveValue('testuser');
    expect(passwordInput).toHaveValue('password');
  });

  it('should submit the form and logs "login successful" ', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        token: 'token',
        userId: 'userId',
        plant_id: 'plant_id',
      },
    });

    const { getByLabelText, getByRole } = render(
      <Router>
        <LoginWeb />
      </Router>
    );

    const usernameInput = getByLabelText('Username:');
    const passwordInput = getByLabelText('Password:');
    const submitButton = getByRole('button', { name: "Login" });

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(console.log).toHaveBeenCalledWith('login successful');
    });
  });

  // it('should display error and redirect on login failure', async () => {
  //   mockedAxios.post.mockRejectedValueOnce({
  //     response: {
  //       status: 401,
  //       data: { message: 'Invalid credentials' },
  //     },
  //   });

  //   const { getByLabelText, getByText } = render(
  //     <Router>
  //       <LoginWeb />
  //     </Router>
  //   );

  //   const usernameInput = getByLabelText('Username:');
  //   const passwordInput = getByLabelText('Password:');
  //   const submitButton = getByText('Login');

  //   fireEvent.change(usernameInput, { target: { value: 'testuser' } });
  //   fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
  //   fireEvent.click(submitButton);

  //   await waitFor(() => {
  //     expect(mockedAxios.post).toHaveBeenCalledWith(
  //       'https://growth-quest.onrender.com/users/login',
  //       { username: 'testuser', password: 'wrongpassword' }
  //     );
  //     expect(localStorage.getItem('token')).toBeNull();
  //     expect(localStorage.getItem('user_id')).toBeNull();
  //     expect(localStorage.getItem('plant_id')).toBeNull();
  //   });

  //   // Redirect check
  //   expect(window.location.pathname).toBe('/password-error');
  // });

  // it('should display loading screen during submission', async () => {
  //   const { getByLabelText, getByText, queryByText } = render(
  //     <Router>
  //       <LoginWeb />
  //     </Router>
  //   );

  //   const usernameInput = getByLabelText('Username:');
  //   const passwordInput = getByLabelText('Password:');
  //   const submitButton = getByText('Login');

  //   fireEvent.change(usernameInput, { target: { value: 'testuser' } });
  //   fireEvent.change(passwordInput, { target: { value: 'password' } });
  //   fireEvent.click(submitButton);

  //   await waitFor(() => {
  //     expect(queryByText('Loading...')).toBeInTheDocument();
  //   });

  //   // Simulate loading completion
  //   await waitFor(() => {
  //     expect(queryByText('Loading...')).not.toBeInTheDocument();
  //   });
  // });
});
