import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from './App';
import { AppStore } from './lib/app-store';
import { Dispatcher } from './lib/dispatcher';

test('renders learn react link', () => {
  const appStore = new AppStore()
  const dispatcher = new Dispatcher(appStore)
  render(<App appStore={appStore} dispatcher={dispatcher}/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
