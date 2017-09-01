import { TestBed, inject } from '@angular/core/testing';

import { ProfessionalAreasService } from './professional-areas.service';

describe('ProfessionalAreasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfessionalAreasService]
    });
  });

  it('should be created', inject([ProfessionalAreasService], (service: ProfessionalAreasService) => {
    expect(service).toBeTruthy();
  }));
});
