import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantidadeModalComponent } from './quantidade-modal.component';

describe('QuantidadeModalComponent', () => {
  let component: QuantidadeModalComponent;
  let fixture: ComponentFixture<QuantidadeModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuantidadeModalComponent]
    });
    fixture = TestBed.createComponent(QuantidadeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
