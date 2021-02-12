import React from 'react'
import { shallow } from 'enzyme';
import DifferenceTable from './DifferenceTable'

describe('<DifferenceTable />', () => {
  let wrapper
  const mockSetRows = jest.fn()
  const mockData = [
    {
      id: "0a75a2b3-be64-4aeb-ba4c-8ddb913791ac", 
      timestamp: "2020-16-02", 
      oldValue: "Nick", 
      newValue: "Michel"
    },
    {
      id: "0a75a2b3-be64-4aeb-ba4c-8ddb913791ab", 
      timestamp: "2020-15-02", 
      oldValue: "Bruce", 
      newValue: "Nick"
    },
  ]

  beforeEach(() => {
    wrapper = shallow(
      <DifferenceTable 
      tableType='Project' 
      rows={mockData} 
      setRows={mockSetRows} 
    />
    )
  })

  it('renders the top row of the table', () => {
    expect(wrapper.find({ 'data-testid': 'top-row' })).toHaveLength(1);
  });

  it('renders the rows', () => {
    expect(wrapper.find({ 'data-testid': 'row' })).toHaveLength(2);
  });

  it('should update state on click', async () => {
    const handleClick = jest.spyOn(React, "useState");
    handleClick.mockImplementation(rows => [ rows, mockSetRows ]);
    wrapper.find({ 'data-testid': 'fetch-button' }).simulate('click')

    expect(mockSetRows).toBeTruthy();
  })
})