import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteLogsComponent } from './reporte-logs.component';

describe('ReporteLogsComponent', () => {
  let component: ReporteLogsComponent;
  let fixture: ComponentFixture<ReporteLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteLogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
