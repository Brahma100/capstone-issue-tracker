import React from 'react'
import {mount, shallow} from 'enzyme'
import toJson from 'enzyme-to-json';
import IssueForm from './IssueForm';
import { Provider } from 'react-redux';
import {store} from '../../../app/store'

describe('IssueForm Snapshot', () => {
    let wrapper;
    beforeEach(() => {
        window.getComputedStyle = () => {};
        wrapper = shallow(<Provider  store={store}><IssueForm/></Provider>);
    });

    test('renders correctly', () => {
        expect(toJson(wrapper)).toMatchSnapshot(); 

    }); 
    it("should create an entry in component state with the event value", () => {
       
        const component = shallow(<Provider  store={store}><IssueForm/></Provider>);

        expect(wrapper.contains(<IssueForm/>)).toBe(true);

    })
})

