import React from 'react';
import renderer from 'react-test-renderer';
import moment from 'moment';

import Time from './Time';
import Badge from './Badge';

import '../i18n';

const testData = {
  breakfast: moment('2019-04-09T06:00:00Z'),
};

describe('<Time />', () => {
  test('Time renders correctly', () => {
    jest.mock('react-svg');

    const testInstance = renderer.create(
      <Time now={testData.breakfast} />
    ).root;

    expect(testInstance.findByProps({ testId: 'Week' }).props.value).toBe(15);
  });
});
