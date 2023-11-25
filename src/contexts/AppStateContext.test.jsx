// AppStateContext.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import { AppStateProvider, AppStateContext } from './AppStateContext';
import { act } from 'react-dom/test-utils';

describe('AppStateContext', () => {
  it('should render children and provide context value', () => {
    render(
      <AppStateProvider>
        <AppStateContext.Consumer>
          {(contextValue) => (
            <div data-testid="context-value">{JSON.stringify(contextValue)}</div>
          )}
        </AppStateContext.Consumer>
      </AppStateProvider>
    );

    const contextValueElement = screen.getByTestId('context-value');
    expect(contextValueElement).toBeInTheDocument();
    // You can add more specific assertions based on your context structure
  });

  it('should update context value when calling updateBoards', () => {
     render(
      <AppStateProvider>
        <AppStateContext.Consumer>
          {(contextValue) => (
            <div>
              <div data-testid="initial-context-value">{JSON.stringify(contextValue)}</div>
              <button
                onClick={() => {
                  contextValue.updateBoards([{ boardName: 'Test Board', purpose: 'Test Purpose' }]);
                }}
                data-testid="update-context-button"
              >
                Update Context
              </button>
            </div>
          )}
        </AppStateContext.Consumer>
      </AppStateProvider>
    );

    const initialContextValueElement = screen.getByTestId('initial-context-value');
    expect(initialContextValueElement).toBeInTheDocument();

    const updateContextButton = screen.getByTestId('update-context-button');
    act(() => {
        updateContextButton.click();
    })
    const updatedContextValueElement = screen.getByTestId('initial-context-value');
    expect(updatedContextValueElement).toHaveTextContent('Test Board');
    expect(updatedContextValueElement).toHaveTextContent('Test Purpose');
  });
});
