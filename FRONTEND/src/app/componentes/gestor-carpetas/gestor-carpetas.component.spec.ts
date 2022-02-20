import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorCarpetasComponent } from './gestor-carpetas.component';

describe('GestorCarpetasComponent', () => {
  let component: GestorCarpetasComponent;
  let fixture: ComponentFixture<GestorCarpetasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestorCarpetasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestorCarpetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
