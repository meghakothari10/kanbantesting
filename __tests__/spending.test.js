import spendingService from '../services/spendingService';

describe('spendingService', () => {
  describe('calculateAverageSpending', () => {
    it('should calculate average spending correctly', async () => {
      // Mock spending data
      const spendingData = [{ amount: 100 }, { amount: 200 }, { amount: 300 }];
      const averageSpending = spendingService.calculateAverageSpending(spendingData);
      expect(averageSpending).toBe(200);
    });

    it('should handle empty spending data', async () => {
      // Mock empty spending data
      const spendingData = [];
      expect(() => spendingService.calculateAverageSpending(spendingData)).toThrowError('Cannot calculate average spending for empty data');
    });

    it('should handle spending data with non-numeric amounts', async () => {
      // Mock spending data with non-numeric amounts
      const spendingData = [{ amount: 100 }, { amount: '200' }, { amount: 300 }];
      expect(() => spendingService.calculateAverageSpending(spendingData)).toThrowError('Invalid spending data');
    });
  });

  describe('getTopCustomers', () => {
    it('should get top 5 customers who spent more than average spending', async () => {
      // Mock spending data
      const spendingData = [
        { customer: 'John', amount: 100 },
        { customer: 'Jane', amount: 200 },
        { customer: 'Bob', amount: 300 },
        { customer: 'Alice', amount: 400 },
        { customer: 'Mike', amount: 500 },
        { customer: 'Emma', amount: 600 },
      ];

      // Mock average spending
      const averageSpending = 250;

      // Get top 5 customers who spent more than average spending
      const topCustomers = spendingService.getTopCustomers(spendingData, averageSpending, 5);
      expect(topCustomers).toEqual([
        { customer: 'Emma', amount: 600 },
        { customer: 'Mike', amount: 500 },
        { customer: 'Alice', amount: 400 },
        { customer: 'Bob', amount: 300 },
        { customer: 'Jane', amount: 200 },
      ]);
    });

    it('should handle no customers who spent more than average spending', async () => {
      // Mock spending data
      const spendingData = [
        { customer: 'John', amount: 100 },
        { customer: 'Jane', amount: 200 },
      ];

      // Mock average spending
      const averageSpending = 300;

      // Get top 5 customers who spent more than average spending
      const topCustomers = spendingService.getTopCustomers(spendingData, averageSpending, 5);
      expect(topCustomers).toEqual([]);
    });
  });

  describe('showTopCustomersWhoSpentMoreThanAverageLastYear', () => {
    it('should show top 5 customers who spent more than average spending last year', async () => {
      // Mock spending data
      const spendingData = [
        { customer: 'John', amount: 100, date: '2022-01-01' },
        { customer: 'Jane', amount: 200, date: '2022-01-02' },
        { customer: 'Bob', amount: 300, date: '2022-01-03' },
        { customer: 'Alice', amount: 400, date: '2022-01-04' },
        { customer: 'Mike', amount: 500, date: '2022-01-05' },
        { customer: 'Emma', amount: 600, date: '2022-01-06' },
      ];

      // Get top 5 customers who spent more than average spending last year
      const topCustomers = spendingService.showTopCustomersWhoSpentMoreThanAverageLastYear(spendingData, 5, '2022');
      expect(topCustomers).toEqual([
        { customer: 'Emma', amount: 600 },
        { customer: 'Mike', amount: 500 },
        { customer: 'Alice', amount: 400 },
        { customer: 'Bob', amount: 300 },
        { customer: 'Jane', amount: 200 },
      ]);
    });

    it('should handle no spending data for last year', async () => {
      // Mock spending data
      const spendingData = [
        { customer: 'John', amount: 100, date: '2021-01-01' },
        { customer: 'Jane', amount: 200, date: '2021-01-02' },
      ];

      // Get top 5 customers who spent more than average spending last year
      const topCustomers = spendingService.showTopCustomersWhoSpentMoreThanAverageLastYear(spendingData, 5, '2022');
      expect(topCustomers).toEqual([]);
    });
  });
});