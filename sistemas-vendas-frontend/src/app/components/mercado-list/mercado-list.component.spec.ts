import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MercadoListComponent } from './mercado-list.component';

describe('MercadoListComponent', () => {
  let component: MercadoListComponent;
  let fixture: ComponentFixture<MercadoListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MercadoListComponent]
    });
    fixture = TestBed.createComponent(MercadoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
