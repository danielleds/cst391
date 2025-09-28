import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAlbum } from './create-album';

describe('CreateAlbum', () => {
  let component: CreateAlbum;
  let fixture: ComponentFixture<CreateAlbum>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAlbum ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAlbum);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
