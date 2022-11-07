import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MySortComponent } from './my-sort.component';

describe('MySortComponent', () => {
  let component: MySortComponent;
  let fixture: ComponentFixture<MySortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
