import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioCatalogoViewerComponent } from './servicio-catalogo-viewer.component';

describe('ServicioCatalogoViewerComponent', () => {
  let component: ServicioCatalogoViewerComponent;
  let fixture: ComponentFixture<ServicioCatalogoViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicioCatalogoViewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicioCatalogoViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
