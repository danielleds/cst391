import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSermon } from './edit-sermon';

describe('EditSermon', () => {
  let component: EditSermon;
  let fixture: ComponentFixture<EditSermon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSermon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSermon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
