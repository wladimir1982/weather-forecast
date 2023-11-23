import { render, fireEvent, screen } from '@testing-library/react';
import ActivityFeed from '../ActivityFeed';

describe('ActivityFeed component', () => {
  test('renders without error', () => {
    render(<ActivityFeed />);
  });

  test('adds a new activity feed when submit button is clicked', () => {
    render(<ActivityFeed />);

    const inputElement = screen.getByPlaceholderText('Add a note about Milton Romaguera...');
    fireEvent.change(inputElement, { target: { value: 'Test activity feed' } });

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    const newActivityFeed = screen.getByText('Test activity feed');
    expect(newActivityFeed).toBeInTheDocument();
  });
});
