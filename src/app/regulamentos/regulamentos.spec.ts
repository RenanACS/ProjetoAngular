import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Regulamentos } from './regulamentos';

describe('Regulamentos', () => {
  let component: Regulamentos;
  let fixture: ComponentFixture<Regulamentos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Regulamentos],
    }).compileComponents();

    fixture = TestBed.createComponent(Regulamentos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
