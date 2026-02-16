import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import CustomerList from './CustomerList';
import calculateAverageSpending from './calculateAverageSpending';

describe('CustomerList component', () => {
  const customers = [
    { id: 1, name: 'John Doe', spending: 1000 },
    { id: 2, name: 'Jane Doe', spending: 2000 },
    { id: 3, name: 'Bob Smith', spending: 3000 },
    { id: 4, name: 'Alice Johnson', spending: 4000 },
    { id: 5, name: 'Mike Brown', spending: 5000 },
    { id: 6, name: 'Emma Davis', spending: 6000 },
    { id: 7, name: 'David Miller', spending: 7000 },
    { id: 8, name: 'Sophia Wilson', spending: 8000 },
    { id: 9, name: 'Oliver Anderson', spending: 9000 },
    { id: 10, name: 'Ava Thomas', spending: 10000 },
  ];

  const averageSpending = calculateAverageSpending(customers);

  const topCustomers = customers
    .filter((customer) => customer.spending > averageSpending)
    .sort((a, b) => b.spending - a.spending)
    .slice(0, 5);

  test('renders customer list', async () => {
    const { getByText } = render(<CustomerList customers={topCustomers} />);
    await waitFor(() => expect(getByText('Top 5 Customers Who Spent More Than Average')).toBeInTheDocument());
    topCustomers.forEach((customer) => {
      expect(getByText(customer.name)).toBeInTheDocument();
      expect(getByText(`Spending: ${customer.spending}`)).toBeInTheDocument();
    });
  });

  test('displays correct number of customers', async () => {
    const { getAllByRole } = render(<CustomerList customers={topCustomers} />);
    await waitFor(() => expect(getAllByRole('listitem')).toHaveLength(topCustomers.length));
  });

  test('handles empty customer list', async () => {
    const { queryByText } = render(<CustomerList customers={[]} />);
    await waitFor(() => expect(queryByText('No customers found')).toBeInTheDocument());
  });

  test('handles null customer list', async () => {
    const { queryByText } = render(<CustomerList customers={null} />);
    await waitFor(() => expect(queryByText('No customers found')).toBeInTheDocument());
  });
});