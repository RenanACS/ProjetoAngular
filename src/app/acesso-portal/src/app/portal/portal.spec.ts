import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Portal } from './portal';
import { RouterModule } from '@angular/router';

describe('Portal', () => {
  let component: Portal;
  let fixture: ComponentFixture<Portal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Portal, RouterModule]
    }).compileComponents();

    fixture = TestBed.createComponent(Portal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});