/* eslint-disable no-unused-vars */
import React from 'react';
import { shallow, render, mount } from 'enzyme';
import { expect } from 'chai';
import { stub } from 'sinon';
/* eslint-enable */

import Filter from '../Filter';

const { describe, it } = global;

describe('Filter', () => {
  it('renders without incident', () => {
    const wrapper = shallow(
      <Filter collection={[]} predicate={() => {}}>
        {() => {}}
      </Filter>
    );

    expect(wrapper).to.be.ok;
  });

  it('filters a list of objects by a predicate function', () => {
    const collection = [
      { id: 'a', name: 'Apple', onSale: false },
      { id: 'b', name: 'Banana', onSale: true },
    ];
    const isOnSale = item => item.onSale;

    const wrapper = shallow(
      <Filter collection={collection} predicate={isOnSale}>
        {({ id, name }) => <div key={id} id={id}>{name}</div>}
      </Filter>
    );

    expect(wrapper.find('#a').length).to.equal(0);
    expect(wrapper.find('#b').length).to.equal(1);
  });

  it('filters by a predicate match object', () => {
    const collection = [
      { id: 'a', name: 'Apple', onSale: false },
      { id: 'b', name: 'Banana', onSale: true },
    ];

    const wrapper = shallow(
      <Filter collection={collection} predicate={{ name: 'Apple' }}>
        {({ id, name }) => <div key={id} id={id}>{name}</div>}
      </Filter>
    );

    expect(wrapper.find('#a').length).to.equal(1);
    expect(wrapper.find('#b').length).to.equal(0);
  });
});
