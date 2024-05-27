import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { HomepageWeb } from '../components/HomepageWeb';
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('HomepageWeb', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch and display user and plant data', async () => {
    mockedAxios.get.mockImplementation((url) => {
      if (url.includes('/users/get/')) {
        return Promise.resolve({ data: { username: 'testuser' } });
      }
      if (url.includes('/plants/get-by-user/')) {
        return Promise.resolve({ data: { level: 5, current_exp: 100, health_points: 10 } });
      }
      return Promise.reject(new Error('not found'));
    });

    Storage.prototype.getItem = jest.fn(() => 'testUserId');

    render(<HomepageWeb />);

    await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(2));

    expect(screen.getByText('Username: testuser')).toBeInTheDocument();
    expect(screen.getByText('Level: 5')).toBeInTheDocument();
    expect(screen.getByText('Exp: 100')).toBeInTheDocument();
    expect(screen.getByText('Health: 10')).toBeInTheDocument();
  });

  it('should display the correct sprite based on plant data', async () => {
    mockedAxios.get.mockImplementation((url) => {
      if (url.includes('/users/get/')) {
        return Promise.resolve({ data: { username: 'testuser' } });
      }
      if (url.includes('/plants/get-by-user/')) {
        return Promise.resolve({ data: { level: 12, current_exp: 200, health_points: 8 } });
      }
      return Promise.reject(new Error('not found'));
    });

    Storage.prototype.getItem = jest.fn(() => 'testUserId');

    render(<HomepageWeb />);

    await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(2));

    const imgElement = screen.getByAltText('GIF');
    expect(imgElement).toHaveAttribute('src', '../assets/Animated-SF3.gif');
  });

  it('should display the default sprite when plant data is not available', async () => {
    mockedAxios.get.mockImplementation((url) => {
      if (url.includes('/users/get/')) {
        return Promise.resolve({ data: { username: 'testuser' } });
      }
      if (url.includes('/plants/get-by-user/')) {
        return Promise.resolve({ data: null });
      }
      return Promise.reject(new Error('not found'));
    });

    Storage.prototype.getItem = jest.fn(() => 'testUserId');

    render(<HomepageWeb />);

    await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(2));

    const imgElement = screen.getByAltText('GIF');
    expect(imgElement).toHaveAttribute('src', '../assets/Animated-SF1.gif');
  });
});
