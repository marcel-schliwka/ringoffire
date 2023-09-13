import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirebaseServiceComponent } from './firebase-service.component';

describe('FirebaseServiceComponent', () => {
  let component: FirebaseServiceComponent;
  let fixture: ComponentFixture<FirebaseServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FirebaseServiceComponent]
    });
    fixture = TestBed.createComponent(FirebaseServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
