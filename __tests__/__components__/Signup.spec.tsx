import React from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent, waitFor } from '@testing-library/react'
import axios from 'axios'
import Signup from '../../components/SignupWeb'
import { BrowserRouter as Router } from 'react-router-dom'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('signup', () => {
    beforeEach(() => {
        localStorage.clear()
        jest.clearAllMocks()
    })

    afterEach(() => {
        localStorage.clear()
        jest.clearAllMocks()
    })

    it('should signup successfully', async () => {
        mockedAxios.post.mockResolvedValueOnce({
            data: {
                userId: 'userId',
            },
        })

        const { getByLabelText, getByRole } = render(
            <Router>
              <Signup/>
            </Router>
          )      
    fireEvent.change(getByLabelText(/username/i), { target: { value: 'username' } })
    fireEvent.change(getByLabelText(/email/i), { target: { value: 'user1@example.com' } })
    fireEvent.change(getByLabelText(/password/i), { target: { value: 'Password1!' } })

    fireEvent.click(getByRole('button', { name: /Sign up/i }))

    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
    expect(window.location.pathname).toBe('/');
    })

    it('should not register successfully', async () => {
        mockedAxios.post.mockRejectedValueOnce({
          response: {status: 400, data: {message: 'internal server error'}},
        });
    
        const { getByLabelText, getByRole} = render(
          <Router>
            <Signup />
          </Router>
        )
    
        fireEvent.change(getByLabelText(/username/i), { target: { value: 'linti' } })
        fireEvent.change(getByLabelText(/email/i), { target: { value: 'hello@gmail.com' } })
        fireEvent.change(getByLabelText(/password/i), { target: { value: 'Password12!' } })
    
        fireEvent.click(getByRole('button', { name: /Sign up/i }))
    
        await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
    
        expect(window.location.pathname).toBe('/');
      });

      it('should show error message when email is invalid', async () => {
        const { getByLabelText, getByRole} = render(
          <Router>
            <Signup />
          </Router>
        )
    
        fireEvent.change(getByLabelText(/username/i), { target: { value: 'linti' } })
        fireEvent.change(getByLabelText(/email/i), { target: { value: 'noEmail' } })
        fireEvent.change(getByLabelText(/password/i), { target: { value: 'Password12!' } })
    
        fireEvent.click(getByRole('button', { name: /Sign up/i }))
    
        await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(0));
    
        expect(window.location.pathname).toBe('/');
      });

      it('should show error message when a required field is missing', async () => {
        window.alert = jest.fn();

        const { getByLabelText, getByRole, getByText } = render(
          <Router>
            <Signup />
          </Router>
        );
    
        fireEvent.change(getByLabelText(/username/i), { target: { value: 'username' } });
        fireEvent.change(getByLabelText(/email/i), { target: { value: 'user1@example.com' } });

        fireEvent.click(getByRole('button', { name: /sign up/i }));
    
        await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(0));
    
        expect(window.alert).toHaveBeenCalledWith('Error signing up');
    });

})