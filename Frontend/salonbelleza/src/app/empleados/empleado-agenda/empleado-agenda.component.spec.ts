import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoAgendaComponent } from './empleado-agenda.component';

describe('EmpleadoAgendaComponent', () => {
  let component: EmpleadoAgendaComponent;
  let fixture: ComponentFixture<EmpleadoAgendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpleadoAgendaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpleadoAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
