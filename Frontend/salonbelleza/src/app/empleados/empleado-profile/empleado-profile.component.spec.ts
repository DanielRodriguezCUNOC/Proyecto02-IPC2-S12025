import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoProfileComponent } from './empleado-profile.component';

describe('EmpleadoProfileComponent', () => {
  let component: EmpleadoProfileComponent;
  let fixture: ComponentFixture<EmpleadoProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpleadoProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpleadoProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
