import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import ListOfTaskWeb from '../../components/ListOfTaskWeb'; 

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ListOfTaskWeb', () => {
  it('should fetch and display tasks', async () => {
    // Mock the Axios POST request for fetching tasks
    mockedAxios.post.mockResolvedValue({
      data: [
        { id: '1', task_name: 'Task 1', type: 'Type A' },
        { id: '2', task_name: 'Task 2', type: 'Type B' },
      ],
    });

    Storage.prototype.getItem = jest.fn(() => 'testUserId');

    const { getByText } = render(<ListOfTaskWeb />);

    await waitFor(() => expect(mockedAxios.post).toHaveBeenCalledTimes(1));

    expect(getByText('Task 1')).toBeInTheDocument();
    expect(getByText('Task 2')).toBeInTheDocument();
  });
});
