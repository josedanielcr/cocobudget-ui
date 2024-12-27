import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewCategoryTransactionComponent } from './review-category-transaction.component';

describe('ReviewCategoryTransactionComponent', () => {
  let component: ReviewCategoryTransactionComponent;
  let fixture: ComponentFixture<ReviewCategoryTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewCategoryTransactionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewCategoryTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
