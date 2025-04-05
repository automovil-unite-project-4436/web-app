import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomovilUnitePageComponent } from './automovil-unite-page.component';

describe('AutomovilUnitePageComponent', () => {
  let component: AutomovilUnitePageComponent;
  let fixture: ComponentFixture<AutomovilUnitePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutomovilUnitePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutomovilUnitePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
