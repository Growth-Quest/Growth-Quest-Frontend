import '@testing-library/jest-dom';
import { render, fireEvent, waitFor, getByRole } from '@testing-library/react';
import axios from 'axios';
import LoginWeb from '../components/LoginWeb';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('LoginWeb', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  })

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  })

  it('should render the login form', () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        token: 'token', userId: 'userId', plant_id: 'plant_id'
      },
    });

    const { getByText, getByLabelText } = render(
      <Router>
        <LoginWeb />
      </Router>
    );

    expect(getByText('Login')).toBeInTheDocument();
    expect(getByLabelText('Username')).toBeInTheDocument();
    expect(getByLabelText('Password')).toBeInTheDocument();
  })
})