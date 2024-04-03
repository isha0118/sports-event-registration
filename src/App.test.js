import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import mockData from './data/events.json';
import { getCategoryInitial, convertTo12HrFormat } from "./utils";

import '@testing-library/jest-dom';


describe('Sports Day Registration App', () => {
  test('renders all events', () => {
    render(<App />);
    mockData.forEach(event => {
      expect(screen.getByText(event.event_name)).toBeInTheDocument();
    });
  });

  test('selects an event and adds it to selected events list', () => {
    render(<App />);
    const selectButton = screen.getAllByText('Select')[0];
    fireEvent.click(selectButton);
    const deselectButton = screen.getAllByText('Remove')[0];
    expect(deselectButton).toBeInTheDocument();
  });

  test('deselects an event and removes it from selected events list', () => {
    render(<App />);
    const selectButton = screen.getAllByText('Select')[0];
    fireEvent.click(selectButton);
    let deselectButton = screen.getAllByText('Remove')[0];
    fireEvent.click(deselectButton);
    expect(deselectButton).not.toBeInTheDocument();
  });

  test('enforces a maximum of 3 selected events', () => {
    render(<App />);
    const selectButtons = screen.getAllByText('Select');
    fireEvent.click(selectButtons[0]);
    fireEvent.click(selectButtons[2]);
    fireEvent.click(selectButtons[4]);
    fireEvent.click(selectButtons[5]);
    expect(screen.getAllByText('Remove').length).toBe(3);
  });

  test('prevents selection of events with conflicting times', () => {
    render(<App />);
    const selectButtons = screen.getAllByText('Select');
    fireEvent.click(selectButtons[0]); 
    fireEvent.click(selectButtons[1]); 
    expect(screen.getAllByText('Remove').length).toBe(1);
  });

});

describe('Utility Functions', () => {
  describe('getCategoryInitial', () => {
    it('returns "S" for "Swimming"', () => {
      expect(getCategoryInitial('Swimming')).toBe('S');
    });

    it('returns "A" for "Athletics"', () => {
      expect(getCategoryInitial('Athletics')).toBe('A');
    });

    it('returns "B" for "Boxing"', () => {
      expect(getCategoryInitial('Boxing')).toBe('B');
    });

    it('returns the first letter of the category if not predefined', () => {
      expect(getCategoryInitial('Running')).toBe('R');
    });
  });

  describe('convertTo12HrFormat', () => {
    it('converts 24-hour time to 12-hour format with AM', () => {
      expect(convertTo12HrFormat('08:30')).toBe('8:30 AM');
    });

    it('converts 24-hour time to 12-hour format with PM', () => {
      expect(convertTo12HrFormat('13:45')).toBe('1:45 PM');
    });

    it('handles noon correctly', () => {
      expect(convertTo12HrFormat('12:00')).toBe('12:00 PM');
    });

    it('handles midnight correctly', () => {
      expect(convertTo12HrFormat('00:00')).toBe('12:00 AM');
    });

    it('removes leading zeros from the hour', () => {
      expect(convertTo12HrFormat('09:05')).toBe('9:05 AM');
    });
  });
});