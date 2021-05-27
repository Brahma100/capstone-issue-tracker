import { fireEvent,} from "@testing-library/react";
import React from 'react';
import {
  render,
  screen,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../app/store';
import  EditIssue from './EditIssue';
import { MemoryRouter } from 'react-router-dom';


const historyMock = {

    location:{ state:{
        issue:{"id":"2827854021bc7a3e7cb73fee","Issue":" Ineffective data edits","Description":"an alphanumeric address field that allows spaces to be entered before any numbers or letters in the address. Therefore, when searches or sorts are performed on the address field, the search or sort may not find the intended address.","Severity":"Minor","Status":"Open","user":{"_id":10,"fname":"Raj","lname":"Jai","email":"1@a.a","city":"Kolkata","state":"West Bengal","country":"India","postal":"700059","password":"$2a$10$KpgATnkGAu.zrRMEoSMFW.8scjfTBN1w46sfGT47wpzh9nR2zr9ly","ip":"103.240.99.25","date":"2021-05-21 22:09:34"},"date":"2021-05-27 17:44:50","rank":0,"editUser":[],"r_date":""}
    }
    },
    push:jest.fn(),
    // goBack:jest.fn()
    };


const renderIssue = () =>
  render(
    <Provider  store={store}>
        < MemoryRouter>
      <EditIssue history={historyMock}/>
      </ MemoryRouter>
    </Provider>,
  );

describe('EditIssue Render',()=>{
 
  test('Checking Form Header', () => {
    const { asFragment } = renderIssue();
    expect(asFragment()).toMatchSnapshot();
    expect(screen.getByText('Edit the Choosen Issue')).toBeInTheDocument();

  });
  test('checking Form Avaiability', () => {
    const { asFragment } = renderIssue();
    expect(asFragment()).toMatchSnapshot();
    const ele=screen.getByText((content, element) => {
        return element.tagName.toLowerCase() === 'form'
      })
    expect(ele).toBeInTheDocument();

  });
  test('Checking the Passed Description Data && Submit Button', () => {
    const { rerender,asFragment } = renderIssue();
    const button =screen.getByRole('button',{name:/submit/i});
    expect(button).toBeInTheDocument();
    expect(screen.getByText("an alphanumeric address field that allows spaces to be entered before any numbers or letters in the address. Therefore, when searches or sorts are performed on the address field, the search or sort may not find the intended address.")).toBeInTheDocument();
    
});
test('Verifying the Passed Comments To the Comments TextArea', () => {
    const { rerender,asFragment } = renderIssue();
    fireEvent.change(screen.getByPlaceholderText(/type comments/i), { target: { value: 'We will resolve this Issue asap..' } })
    expect(screen.getByText("We will resolve this Issue asap..")).toBeInTheDocument();
 
});
test('Trying To click on Submit Button After filling Comments', () => {
    const { rerender,asFragment } = renderIssue();
    fireEvent.change(screen.getByPlaceholderText(/type comments/i), { target: { value: 'We will resolve this Issue asap..' } })
    expect(screen.getByText("We will resolve this Issue asap..")).toBeInTheDocument();
    const submitButton =screen.getByRole('button',{name:/submit/i});
    fireEvent.click(submitButton);
    // expect(screen.getByText("We will resolve this Issue asap..")).toBeInTheDocument();

});

})
 
  





















// import React from 'react'
// import {shallow} from 'enzyme'
// import toJson from 'enzyme-to-json'
// import EditIssue from './EditIssue'

// jest.mock('react-router-dom', () => ({
//     useLocation: jest.fn().mockReturnValue({
//       pathname: '/another-route',
//       search: '',
//       hash: '',
//       state: null,
//       key: '5nvxpbdafa',
//     }),
//     history:{
//         location:'test'
//     }
// }));

// describe('Test UserForm using Shallow rendering', () => {

// let wrapper;
// let props;

// const historyMock = {

// location:{ state:{
//     issue:{"id":"2827854021bc7a3e7cb73fee","Issue":" Ineffective data edits","Description":"an alphanumeric address field that allows spaces to be entered before any numbers or letters in the address. Therefore, when searches or sorts are performed on the address field, the search or sort may not find the intended address.","Severity":"Minor","Status":"Open","user":{"_id":10,"fname":"Raj","lname":"Jai","email":"1@a.a","city":"Kolkata","state":"West Bengal","country":"India","postal":"700059","password":"$2a$10$KpgATnkGAu.zrRMEoSMFW.8scjfTBN1w46sfGT47wpzh9nR2zr9ly","ip":"103.240.99.25","date":"2021-05-21 22:09:34"},"date":"2021-05-27 17:44:50","rank":0,"editUser":[],"r_date":""}
// }
// }
// };

// beforeEach(() => {
//     props = {
        
//             location:{
//                 state:{
//                     issue:{"id":"2827854021bc7a3e7cb73fee","Issue":" Ineffective data edits","Description":"an alphanumeric address field that allows spaces to be entered before any numbers or letters in the address. Therefore, when searches or sorts are performed on the address field, the search or sort may not find the intended address.","Severity":"Minor","Status":"Open","user":{"_id":10,"fname":"Raj","lname":"Jai","email":"1@a.a","city":"Kolkata","state":"West Bengal","country":"India","postal":"700059","password":"$2a$10$KpgATnkGAu.zrRMEoSMFW.8scjfTBN1w46sfGT47wpzh9nR2zr9ly","ip":"103.240.99.25","date":"2021-05-21 22:09:34"},"date":"2021-05-27 17:44:50","rank":0,"editUser":[],"r_date":""}
//                 }
            
//         }
//     }
//     wrapper = shallow(<EditIssue history={historyMock} />);
// })

//     it('renders "Issue Name" as heading in second column' , () => {
//         let secondColumnHeading = wrapper.find('th').at(1);
//         expect(secondColumnHeading.render().text()).toContain('Issue Name');
//      })

//     //  it('renders "Status" as heading in fourth column' , () => {
//     //     let fourthColumnHeading = wrapper.find('th').at(3);
//     //     expect(fourthColumnHeading.render().text()).toContain('Status');
//     //  })
//     //  it("passes the 2nd Issue's name as props to second Issue Component", () => {
//     //    let secondIssue = wrapper.find('Issue').at(1)
//     //     expect(secondIssue.render().text()).toContain('The heading Add is wrongly displayed as Edit');
//     // });

//     // it("passes the 1st Issue's NAME as props to first issue Component", () => {
//     //     let secondIssue = wrapper.find('Issue').at(0)
//     //      expect(secondIssue.render().text()).toContain("On Cliking Delete");
//     //  });
// });


// // describe('When Issues array passed to IssueList component is null', () => {
// //     let wrapper;
// //     let props;

// //     beforeEach(() => {  
// //         props = {
// //             Issues: null 
// //         }
// //         wrapper = shallow(<EditIssue history={historyMock}/>);
// //     }); 

// //     it('should not crash and no Issue Component is rendered', () => {
// //         let Issueelement = wrapper.find('Issue');
// //         expect(Issueelement.length).toEqual(0);
// //     });

    

// // });