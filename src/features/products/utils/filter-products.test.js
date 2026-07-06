import { describe, it, expect } from 'vitest';
import { filterProductsByQuery } from './filter-products.js';

const products = [
  { id: '1', brand: 'Acer', model: 'Liquid Z6' },
  { id: '2', brand: 'alcatel', model: 'Flash (2017)' },
  { id: '3', brand: 'Samsung', model: 'Galaxy S9' },
];

describe('filterProductsByQuery', () => {
  it('returns every product when the query is empty', () => {
    expect(filterProductsByQuery(products, '')).toEqual(products);
  });

  it('returns every product when the query is only whitespace', () => {
    expect(filterProductsByQuery(products, '   ')).toEqual(products);
  });

  it('matches by brand, case-insensitively', () => {
    expect(filterProductsByQuery(products, 'ACER')).toEqual([products[0]]);
  });

  it('matches by model, case-insensitively', () => {
    expect(filterProductsByQuery(products, 'galaxy')).toEqual([products[2]]);
  });

  it('returns an empty array when nothing matches', () => {
    expect(filterProductsByQuery(products, 'nokia')).toEqual([]);
  });
});
