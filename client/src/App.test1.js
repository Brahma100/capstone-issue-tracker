import React from 'react'
import {mount, shallow} from 'enzyme'
import toJson from 'enzyme-to-json';
import App from './App';
import { Provider } from 'react-redux';
import {store} from './app/store'

describe('App Snapshot', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(<Provider  store={store}><App/></Provider>);
    });

    test('renders correctly', () => {
        expect(toJson(wrapper)).toMatchSnapshot(); 
    }); 
     
});

// describe('App rendering of elements' , () => {
//     let wrapper1;
//     beforeEach(() => { 
//         wrapper1 = shallow(<Provider store={store}><App/></Provider>)
//     })
   
//     it('renders one App React component', () => {
//         expect(wrapper1.find('h1').length).toEqual(1)
//     })  
// });
