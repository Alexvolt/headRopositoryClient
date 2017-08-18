import { TestBed, inject } from '@angular/core/testing';

import { NavItemsService } from './nav-items.service';

describe('NavItemsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavItemsService]
    });
  });

  it('should be created', inject([NavItemsService], (service: NavItemsService) => {
    expect(service).toBeTruthy();
  }));
});
