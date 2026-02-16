import customerService from '../services/customerService';

describe('customerService', () => {
  describe('getTopCustomersLastYear', () => {
    it('should find top 5 customers who spent more than average last year', async () => {
      // Mock data
      const customers = [
        { id: 1, name: 'John Doe', spendingLastYear: 1000 },
        { id: 2, name: 'Jane Doe', spendingLastYear: 2000 },
        { id: 3, name: 'Bob Smith', spendingLastYear: 3000 },
        { id: 4, name: 'Alice Johnson', spendingLastYear: 4000 },
        { id: 5, name: 'Mike Brown', spendingLastYear: 5000 },
        { id: 6, name: 'Emma Davis', spendingLastYear: 6000 },
        { id: 7, name: 'David Miller', spendingLastYear: 7000 },
        { id: 8, name: 'Sophia Wilson', spendingLastYear: 8000 },
        { id: 9, name: 'Oliver Anderson', spendingLastYear: 9000 },
        { id: 10, name: 'Ava Thomas', spendingLastYear: 10000 },
      ];

      // Service call
      const topCustomers = await customerService.getTopCustomersLastYear(customers);

      // Assertions
      expect(topCustomers).toHaveLength(5);
      expect(topCustomers[0].spendingLastYear).toBe(10000);
      expect(topCustomers[1].spendingLastYear).toBe(9000);
      expect(topCustomers[2].spendingLastYear).toBe(8000);
      expect(topCustomers[3].spendingLastYear).toBe(7000);
      expect(topCustomers[4].spendingLastYear).toBe(6000);
    });

    it('should return empty array if no customers spent more than average', async () => {
      // Mock data
      const customers = [
        { id: 1, name: 'John Doe', spendingLastYear: 100 },
        { id: 2, name: 'Jane Doe', spendingLastYear: 200 },
        { id: 3, name: 'Bob Smith', spendingLastYear: 300 },
      ];

      // Service call
      const topCustomers = await customerService.getTopCustomersLastYear(customers);

      // Assertions
      expect(topCustomers).toHaveLength(0);
    });

    it('should handle error when getting customers', async () => {
      // Mock data and service call
      jest.spyOn(customerService, 'getCustomers').mockRejectedValue(new Error('Mocked error'));

      await expect(customerService.getTopCustomersLastYear([])).rejects.toThrow('Mocked error');
    });
  });
});