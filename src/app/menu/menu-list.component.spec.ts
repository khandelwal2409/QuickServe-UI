import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuListComponent } from './menu-list.component';

describe('MenuListComponent', () => {
  let fixture: ComponentFixture<MenuListComponent>;
  let component: MenuListComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuListComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(MenuListComponent);
    component = fixture.componentInstance;
  });

  it('should create the menu list component', () => {
    expect(component).toBeTruthy();
  });
});