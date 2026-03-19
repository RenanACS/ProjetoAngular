import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratorioItem } from './laboratorio-item';

describe('LaboratorioItem', () => {
  let component: LaboratorioItem;
  let fixture: ComponentFixture<LaboratorioItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaboratorioItem],
    }).compileComponents();

    fixture = TestBed.createComponent(LaboratorioItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
