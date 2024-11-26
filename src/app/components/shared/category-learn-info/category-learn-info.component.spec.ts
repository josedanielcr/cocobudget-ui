import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryLearnInfoComponent } from './category-learn-info.component';

describe('CategoryLearnInfoComponent', () => {
  let component: CategoryLearnInfoComponent;
  let fixture: ComponentFixture<CategoryLearnInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryLearnInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryLearnInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
