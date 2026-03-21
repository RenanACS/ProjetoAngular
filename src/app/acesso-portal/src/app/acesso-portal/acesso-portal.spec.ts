import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcessoPortal } from './acesso-portal';

describe('AcessoPortal', () => {
  let component: AcessoPortal;
  let fixture: ComponentFixture<AcessoPortal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcessoPortal],
    }).compileComponents();

    fixture = TestBed.createComponent(AcessoPortal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
