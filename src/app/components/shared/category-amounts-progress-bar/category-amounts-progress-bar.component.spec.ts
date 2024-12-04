import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryAmountsProgressBarComponent } from './category-amounts-progress-bar.component';

describe('CategoryAmountsProgressBarComponent', () => {
  let component: CategoryAmountsProgressBarComponent;
  let fixture: ComponentFixture<CategoryAmountsProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryAmountsProgressBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryAmountsProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
