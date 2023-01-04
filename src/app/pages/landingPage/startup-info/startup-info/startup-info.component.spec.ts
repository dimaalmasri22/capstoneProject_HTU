import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartupInfoComponent } from './startup-info.component';

describe('StartupInfoComponent', () => {
  let component: StartupInfoComponent;
  let fixture: ComponentFixture<StartupInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartupInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartupInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
