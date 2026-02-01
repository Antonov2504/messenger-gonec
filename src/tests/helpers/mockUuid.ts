jest.mock('uuid', () => ({
  v4: jest.fn(() => 'mock-uuid'),
}));
