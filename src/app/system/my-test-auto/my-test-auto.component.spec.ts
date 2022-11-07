import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTestAutoComponent } from './my-test-auto.component';

describe('MyTestAutoComponent', () => {
  let component: MyTestAutoComponent;
  let fixture: ComponentFixture<MyTestAutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyTestAutoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTestAutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
