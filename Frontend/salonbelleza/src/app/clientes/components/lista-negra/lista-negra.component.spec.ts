import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaNegraComponent } from './lista-negra.component';

describe('ListaNegraComponent', () => {
  let component: ListaNegraComponent;
  let fixture: ComponentFixture<ListaNegraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaNegraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaNegraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
