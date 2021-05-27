import { waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import React from 'react';
import {
  render,
  screen,
  within,
  
  fireEvent,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import  Issues from './Issues';
import { MemoryRouter } from 'react-router-dom';
import axios from "axios";


const renderIssue = () =>
  render(
    <Provider store={store}>
        < MemoryRouter>
      <Issues/>
      </ MemoryRouter>
    </Provider>,
  );

//   beforeEach(() => {
//     window.getComputedStyle = () => {};
   
// });
  test('Renders the Issues', () => {
    const { asFragment } = renderIssue();
    expect(asFragment()).toMatchSnapshot();
   
  });

