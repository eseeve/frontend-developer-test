import React from 'react';
import { shallow } from 'enzyme';
import { App } from './App';

describe('<App />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  describe('render()', () => {
    it('renders the Box', () => {
      expect(wrapper.find({ 'data-testid': 'app-box' })).toHaveLength(1);
    });

    it('renders the Header', () => {
      expect(wrapper.find({ 'data-testid': 'app-header' })).toHaveLength(1);
    });

    it('renders the one table', () => {
      expect(wrapper.find({ 'data-testid': 'app-table' })).toHaveLength(1);
    });
  });
});
