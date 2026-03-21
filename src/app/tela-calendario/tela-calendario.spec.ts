import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaCalendario } from './tela-calendario';

describe('TelaCalendario', () => {
  let component: TelaCalendario;
  let fixture: ComponentFixture<TelaCalendario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaCalendario],
    }).compileComponents();

    fixture = TestBed.createComponent(TelaCalendario);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
