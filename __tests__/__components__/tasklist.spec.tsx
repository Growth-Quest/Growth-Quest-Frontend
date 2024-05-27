import React from 'react';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import TaskListWeb from '../../components/TaskListWeb'; 

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('TaskListWeb', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should fetch and display tasks', async () => {
    mockedAxios.post.mockResolvedValue({
      data: [
        { id: '1', task_name: 'Test Task 1', description: 'Description 1', type: 'easy' },
        { id: '2', task_name: 'Test Task 2', description: 'Description 2', type: 'medium' },
      ],
    });
  
    Storage.prototype.getItem = jest.fn(() => 'testUserId');
  
    render(<TaskListWeb />);
  
    await waitFor(() => expect(mockedAxios.post).toHaveBeenCalledTimes(1));
  
    const taskNameElements = screen.queryAllByText('Task Name:');
    expect(taskNameElements).toHaveLength(2);
    expect(taskNameElements[0]).toBeInTheDocument();
    expect(taskNameElements[1]).toBeInTheDocument();
  
    expect(screen.getByText('Test Task 1')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('easy')).toBeInTheDocument();
  
    expect(screen.getByText('Test Task 2')).toBeInTheDocument();
    expect(screen.getByText('Description 2')).toBeInTheDocument();
    expect(screen.getByText('medium')).toBeInTheDocument();
  });
  
});
