import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CineclubesComponent } from './cineclubes.component';

describe('CineclubesComponent', () => {
  let component: CineclubesComponent;
  let fixture: ComponentFixture<CineclubesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CineclubesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CineclubesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
