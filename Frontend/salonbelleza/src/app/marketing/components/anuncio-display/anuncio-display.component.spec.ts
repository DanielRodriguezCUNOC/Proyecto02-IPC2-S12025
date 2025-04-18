import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnuncioDisplayComponent } from './anuncio-display.component';

describe('AnuncioDisplayComponent', () => {
  let component: AnuncioDisplayComponent;
  let fixture: ComponentFixture<AnuncioDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnuncioDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnuncioDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
