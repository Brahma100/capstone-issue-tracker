import { fireEvent,} from "@testing-library/react";
import React from 'react';
import {
  render,
  screen,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import  UserForm from './UserForm';
import { MemoryRouter } from 'react-router-dom';


const historyMock = {

    location:{ 
    
    },
    // push:jest.fn(),
    };


const renderIssue = () =>
  render(
    <Provider  store={store}>
        < MemoryRouter>
      <UserForm history={historyMock}/>
      </ MemoryRouter>
    </Provider>,
  );

describe('UserForm Render',()=>{
 
  test('Checking Form Header', () => {
    const { asFragment } = renderIssue();
    expect(asFragment()).toMatchSnapshot();
    expect(screen.getByText('Login')).toBeInTheDocument();

  });
  test('checking Form Avaiability', () => {
    const { asFragment } = renderIssue();
    expect(asFragment()).toMatchSnapshot();
    const ele=screen.getByText((content, element) => {
        return element.tagName.toLowerCase() === 'form'
      })
    expect(ele).toBeInTheDocument();

  });
  test('Checking the  Submit Button', () => {
    const { rerender,asFragment } = renderIssue();
    const button =screen.getByRole('button',{name:/login/i});
    expect(button).toBeInTheDocument();
    
});
// test('Verifying the Passed Email To the Comments TextArea', () => {
//     const { rerender,asFragment } = renderIssue();
//     fireEvent.change(screen.getByPlaceholderText(/Enter Email ID/i), { target: { value: '2@a.a' } })
//     expect(screen.getByText("2@a.a")).toBeInTheDocument();
 
// });
test('Trying To click on Submit Button After filling email & password', () => {
    const { rerender,asFragment } = renderIssue();
    fireEvent.change(screen.getByPlaceholderText(/email id/i), { target: { value: '2@a.a' } })
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'aaaaaa' } })
    const submitButton =screen.getByRole('button',{name:/login/i});
    fireEvent.click(submitButton);
    expect(screen.getByText(/login now/i)).toBeInTheDocument();

});
test('Toggling Login Form to Register Form && Verifying it', () => {
    const { rerender,asFragment } = renderIssue();
    fireEvent.click(screen.getByText(/Create an Account/i))
    expect(screen.getByText(/Create a New Account/i)).toBeInTheDocument();

});

})
 
  









