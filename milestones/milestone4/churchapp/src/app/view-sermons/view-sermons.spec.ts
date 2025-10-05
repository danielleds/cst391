import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSermons } from './view-sermons';

describe('ViewSermons', () => {
  let component: ViewSermons;
  let fixture: ComponentFixture<ViewSermons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSermons]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSermons);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
