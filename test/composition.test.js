/* eslint-disable no-unused-vars */
import React from 'react';
import { shallow, render, mount } from 'enzyme';
import { expect } from 'chai';
/* eslint-enable */

import Filter from '../src/components/Filter';
import Sort from '../src/components/Sort';

import { clearWhitespace } from '../src/helpers/test.helpers';


const { describe, it } = global;
const sampleCollection = [
  { id: 'a', name: 'Apple', price: 3.99 },
  { id: 'b', name: 'Banana', price: 5 },
  { id: 'c', name: 'Carrot', price: 3.25 },
];

describe('composition', () => {
  it('composes a Filter and a Sort', () => {
    const wrapper = render(
      <Filter collection={sampleCollection} predicate={item => item.price < 5}>
        <Sort comparator="price">
          {item => <div key={item.id}>{item.name}</div>}
        </Sort>
      </Filter>
    );

    const actualOutput = wrapper.html();
    const expectedOutput = clearWhitespace(`
      <div>
        <div>Carrot</div>
        <div>Apple</div>
      </div>
    `);

    expect(actualOutput).to.equal(expectedOutput);
  });

  it('composes a Sort and a Filter', () => {
    // While you likely wouldn't want to do this, it's good to check and make
    // sure that they compose bi-directionally.
    const wrapper = render(
      <Sort collection={sampleCollection} comparator="price">
        <Filter predicate={item => item.price < 5}>
          {item => <div key={item.id}>{item.name}</div>}
        </Filter>
      </Sort>
    );

    const actualOutput = wrapper.html();
    const expectedOutput = clearWhitespace(`
      <div>
        <div>Carrot</div>
        <div>Apple</div>
      </div>
    `);

    expect(actualOutput).to.equal(expectedOutput);
  });
});
