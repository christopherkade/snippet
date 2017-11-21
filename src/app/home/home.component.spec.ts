import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';
import { CodemirrorModule } from 'ng2-codemirror';
import { BrowserModule } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [
        BrowserModule,
        FormsModule,
        CodemirrorModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have config', () => {
    expect(component.config) != null;
  });

  it('should have content', () => {
    expect(component.content).toEqual(`// Made with <3 by @christopherkade
function hello() {
  print('Hello World!');
}`);
  });

  it('should have languages', () => {
    expect(component.languages.length > 0).toBeTruthy();
  });

  it('should have selected language', () => {
    expect(component.selectedLanguage).toEqual(component.languages[0]);
  });

  it('should change language', () => {
    component.changeLanguage('HTML');
    expect(component.codemirror.instance.options.mode).toEqual('text/xml')
  });
});
