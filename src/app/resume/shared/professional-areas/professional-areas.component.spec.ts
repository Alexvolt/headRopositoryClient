import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalAreasComponent } from './professional-areas.component';

describe('ProfessionalAreasComponent', () => {
  let component: ProfessionalAreasComponent;
  let fixture: ComponentFixture<ProfessionalAreasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessionalAreasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionalAreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
