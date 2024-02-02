import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppModalOverlayComponent } from './app-modal-overlay.component';

describe('AppModalOverlayComponent', () => {
  let component: AppModalOverlayComponent;
  let fixture: ComponentFixture<AppModalOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppModalOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppModalOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
