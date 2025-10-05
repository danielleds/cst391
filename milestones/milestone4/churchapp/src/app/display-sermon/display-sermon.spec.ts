import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySermon } from './display-sermon';

describe('DisplaySermon', () => {
  let component: DisplaySermon;
  let fixture: ComponentFixture<DisplaySermon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplaySermon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplaySermon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
