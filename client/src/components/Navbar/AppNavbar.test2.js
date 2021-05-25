import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
// import {Provider} from 'react-redux';
import {mount, shallow} from 'enzyme';
// import {expect} from 'chai';
// import LoginContainer from '../../src/login/login.container';
// import Login from '../../src/login/Login';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
// import { stub } from 'sinon';


import AppNavBar from './AppNavbar';
import App from '../../App';


const mockStore = configureMockStore([thunk]);

describe('Container Login', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      user: {
        userinfo: {},
        isAuthenticated:false,
      },
    });
  });
  it('should render the container component', () => {
    const wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(wrapper.find('App').length).toEqual(1);
    const container = wrapper.find('App');
    expect(container.find('AppNavBar').length).toEqual(0);
    // expect(container.find('AppNavBar').props().user).toEqual({ isAuthenticated: false });
  });

  // it('should perform login', () => {
  //   const loginStub = stub().withArgs({
  //     username: 'abcd',
  //     password: '1234',
  //   });
  //   const wrapper = mount(<Login
  //     loginUser={loginStub}
  //   />);
  // wrapper.find('button').simulate('click');
  // expect(loginStub.callCount).to.equal(1);
  // });
});

// const mockStore = configureStore([]);

// describe('My Connected React-Redux Component', () => {
//   let store;
//   let component;
 
//   beforeEach(() => {
//     store = mockStore({
//     user:{
//       userinfo:{}
//     }
//     });
 
//     component = renderer.create(
//       <Provider store={store}>
//         <AppNavBar />
//       </Provider>
//     );
//   });
 
//   it('should render with given state from Redux store', () => {
//     expect(component.toJSON()).toMatchSnapshot();
//   });
 
  // it('should dispatch an action on button click', () => {
  //   renderer.act(() => {
  //     component.root.findByType('button').props.onClick();
  //   });
 
  //   renderer.act(() => {
  //     component.root.findByType('input')
  //       .props.onChange({ target: { value: 'some other text' } });
  //   });
 
  //   expect(store.dispatch).toHaveBeenCalledTimes(1);
  //   expect(store.dispatch).toHaveBeenCalledWith(
  //     myAction({ payload: 'some other text' })
  //   );
  // });
// });

