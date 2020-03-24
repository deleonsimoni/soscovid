import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCriarContaComponent } from './modal-criar-conta.component';

describe('ModalCriarContaComponent', () => {
  let component: ModalCriarContaComponent;
  let fixture: ComponentFixture<ModalCriarContaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCriarContaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCriarContaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
