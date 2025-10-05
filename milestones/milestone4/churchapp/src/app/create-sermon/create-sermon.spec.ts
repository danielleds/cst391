import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSermon } from './create-sermon';

describe('CreateSermon', () => {
  let component: CreateSermon;
  let fixture: ComponentFixture<CreateSermon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSermon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSermon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
