import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorArchivosComponent } from './gestor-archivos.component';

describe('GestorArchivosComponent', () => {
  let component: GestorArchivosComponent;
  let fixture: ComponentFixture<GestorArchivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestorArchivosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestorArchivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
