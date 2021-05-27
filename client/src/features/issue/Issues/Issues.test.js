import { waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import React from 'react';
import {
  render,
  screen,
  within,
  
  fireEvent,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../app/store';
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

describe('Issue Render',()=>{
 
  test('Rendering Issue and pagination', () => {
    const { asFragment } = renderIssue();
    expect(asFragment()).toMatchSnapshot();
    expect(screen.getByRole('pagination')).toBeInTheDocument();

  });
  test('Rendering Chart', () => {
    const { asFragment } = renderIssue();
    expect(asFragment()).toMatchSnapshot();
    expect(screen.getByText(/issue chart/i)).toBeInTheDocument();
    expect(screen.getByText(/in progress/i)).toBeInTheDocument();
    expect(screen.getByText(/open/i)).toBeInTheDocument();
    expect(screen.getByText(/closed/i)).toBeInTheDocument();

  });
 
})
 
  



