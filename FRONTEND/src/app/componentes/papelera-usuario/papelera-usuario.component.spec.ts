import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PapeleraUsuarioComponent } from './papelera-usuario.component';

describe('PapeleraUsuarioComponent', () => {
  let component: PapeleraUsuarioComponent;
  let fixture: ComponentFixture<PapeleraUsuarioComponent>;

  beforeEach(async () =>
    await TestBed.configureTestingModule({
      declarations: [PapeleraUsuarioComponent]
    })
      .compileComponents());

  beforeEach(() => {
    fixture = TestBed.createComponent(PapeleraUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
