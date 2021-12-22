import { TestBed } from '@angular/core/testing';

import { ObjectResolver } from './object.resolver';

describe('ObjectResolver', () => {
  let resolver: ObjectResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ObjectResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
