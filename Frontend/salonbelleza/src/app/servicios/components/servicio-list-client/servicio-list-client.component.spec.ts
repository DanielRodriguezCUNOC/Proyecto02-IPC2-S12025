import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioListClientComponent } from './servicio-list-client.component';

describe('ServicioListClientComponent', () => {
  let component: ServicioListClientComponent;
  let fixture: ComponentFixture<ServicioListClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicioListClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicioListClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
