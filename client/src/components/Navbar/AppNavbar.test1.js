import React from 'react';
import {
  render,
  screen,
  within,
  RenderResult,
  fireEvent,
} from '@testing-library/react';
import { Provider } from 'react-redux';

import { store } from '../../app/store';
import  AppNavBar from './AppNavBar';
import UserForm from '../../features/user/UserForm'
// import { reset } from '../../profileSlice';
import {loadUserAsync, loginUserAsync} from '../../features/user/userSlice';
import { MemoryRouter } from 'react-router-dom';
import Issues from '../../features/issue/Issues';
import { shallow } from 'enzyme';
const { getComputedStyle } = window;
window.getComputedStyle = (elt) => getComputedStyle(elt);
const flushPromises = () => new Promise(setImmediate);
const renderCard = () =>
  render(
    <Provider store={store}>
        < MemoryRouter>
      <AppNavBar/>
      <UserForm/>
      </ MemoryRouter>
    </Provider>,
  );


  test('Renders the AppNavbar', () => {
    const { asFragment } = renderCard();
    expect(asFragment()).toMatchSnapshot();
    expect(screen.getByText(/trackerz/i)).toBeInTheDocument();
    const button = screen.getByRole('button', { name: /register/i});
    expect(button).toBeInTheDocument();
    const button1 = screen.getByRole('link',{name:/home/i});
    expect(button1).toBeInTheDocument();
   
  });
  test('Renders the UserForm',async () => {
    const { asFragment } = renderCard();
    expect(asFragment()).toMatchSnapshot();
    expect(screen.getByText(/Login Now/i)).toBeInTheDocument();
    const loginbutton = screen.getByRole('button', { name: /login/i});
    expect(loginbutton).toBeInTheDocument();
    // const email=screen.get
    const credentials = { email: '2@a.a', password: 'aaaaaa' };
    expect(screen.getByPlaceholderText('Email ID')).toBeInTheDocument();
    const email=screen.getByPlaceholderText('Email ID');
    email.value=credentials.email;
    const password=screen.getByPlaceholderText('Password');
    password.value=credentials.password;
    fireEvent.click(loginbutton);
    expect(loginbutton).toBeInTheDocument();

   
  });

  test('test Register button',async () => {
    const { rerender, asFragment } = renderCard();

    const registerButton = screen.getByRole('button',{name:/register/i});




    fireEvent.click(registerButton);
    rerender(
      <Provider store={store}>
          
           < MemoryRouter>
        <AppNavBar />
        <UserForm/>
           </MemoryRouter>
      </Provider>
    );

    const loginbutton = screen.getByRole('button', { name: /login/i});
    expect(loginbutton).toBeInTheDocument();
    // const email=screen.get
    const credentials = { email: '2@a.a', password: 'aaaaaa' };
    expect(screen.getByPlaceholderText('Email ID')).toBeInTheDocument();
    const email=screen.getByPlaceholderText('Email ID');
    email.value=credentials.email;
    const password=screen.getByPlaceholderText('Password');
    password.value=credentials.password;
    expect(password.value).toBe('aaaaaa');
    expect(email.value).toBe('2@a.a');
    fireEvent.click(loginbutton);
    // fireEvent.click(loginbutton);
    // await store.dispatch(loginUserAsync(credentials));
  
    // console.log("Store Data .................>>>>>",store.getState().user);
    // store.dispatch(loadUserAsync());
    rerender(
        <Provider store={store}>
             < MemoryRouter>
          <AppNavBar />
        
             </MemoryRouter>
        </Provider>
      );
 
 
    // const user=await screen.getByText(/Mahesh Jaiswal/i)
    // expect(user).toBeInTheDocument();

  });