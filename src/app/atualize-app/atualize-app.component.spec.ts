import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizeAppComponent } from './atualize-app.component';

describe('AtualizeAppComponent', () => {
  let component: AtualizeAppComponent;
  let fixture: ComponentFixture<AtualizeAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtualizeAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtualizeAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
