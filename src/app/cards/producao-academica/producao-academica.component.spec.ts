import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducaoAcademicaComponent } from './producao-academica.component';

describe('ProducaoAcademicaComponent', () => {
  let component: ProducaoAcademicaComponent;
  let fixture: ComponentFixture<ProducaoAcademicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProducaoAcademicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducaoAcademicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
