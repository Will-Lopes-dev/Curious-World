import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountryModalPage } from './country-modal.page';

describe('CountryModalPage', () => {
  let component: CountryModalPage;
  let fixture: ComponentFixture<CountryModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
