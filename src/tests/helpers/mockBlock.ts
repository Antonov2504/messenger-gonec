jest.mock('@/shared/Block', () => {
  return {
    Block: class {
      getContent() {
        const el = document.createElement('div');
        el.textContent = 'MockBlock';
        return el;
      }
      dispatchComponentDidMount() {}
      dispatchComponentWillUnmount() {}
    },
  };
});
