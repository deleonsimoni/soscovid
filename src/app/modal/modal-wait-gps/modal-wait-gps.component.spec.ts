import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalWaitGpsComponent } from './modal-wait-gps.component';

describe('ModalWaitGpsComponent', () => {
  let component: ModalWaitGpsComponent;
  let fixture: ComponentFixture<ModalWaitGpsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalWaitGpsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalWaitGpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
