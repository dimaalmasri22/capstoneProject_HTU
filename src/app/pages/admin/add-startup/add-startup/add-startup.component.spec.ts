import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStartupComponent } from './add-startup.component';

describe('AddStartupComponent', () => {
  let component: AddStartupComponent;
  let fixture: ComponentFixture<AddStartupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStartupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStartupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
