export const PASSWORD = 'secret_sauce';

export const USERS = {
  standard: 'standard_user',
  lockedOut: 'locked_out_user',
  problem: 'problem_user',
} as const;

export const PRODUCTS = {
  backpack: { slug: 'sauce-labs-backpack', name: 'Sauce Labs Backpack', price: 29.99 },
  bikeLight: { slug: 'sauce-labs-bike-light', name: 'Sauce Labs Bike Light', price: 9.99 },
  onesie: { slug: 'sauce-labs-onesie', name: 'Sauce Labs Onesie', price: 7.99 },
} as const;

export const CUSTOMER = { firstName: 'Ivan', lastName: 'Petrenko', postalCode: '36000' };
