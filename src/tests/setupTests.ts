/// <reference types="jest" />
import './helpers/mockUuid';

beforeEach(() => {
  document.body.innerHTML = `
    <div id="app"></div>
  `;
});
