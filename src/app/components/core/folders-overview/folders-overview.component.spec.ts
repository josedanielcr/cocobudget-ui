import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoldersOverviewComponent } from './folders-overview.component';

describe('FoldersOverviewComponent', () => {
  let component: FoldersOverviewComponent;
  let fixture: ComponentFixture<FoldersOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoldersOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoldersOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
