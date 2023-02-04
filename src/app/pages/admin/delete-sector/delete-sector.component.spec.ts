import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSectorComponent } from './delete-sector.component';

describe('DeleteSectorComponent', () => {
  let component: DeleteSectorComponent;
  let fixture: ComponentFixture<DeleteSectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteSectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteSectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
