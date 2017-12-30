import { Component, OnInit, ViewChild } from '@angular/core';
import { CodemirrorComponent } from 'ng2-codemirror';
import * as html2canvas from '../../assets/html2canvas.min.js';
import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/mode/crystal/crystal';
import 'codemirror/mode/python/python';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/http/http';
import 'codemirror/mode/jsx/jsx';
import { detect } from 'detect-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  @ViewChild(CodemirrorComponent)
  private codemirrorComponent: CodemirrorComponent;
  languages = ['Javascript', 'JSX', 'HTML',
  'CSS', 'Crystal', 'Python'];
  selectedLanguage = this.languages[0];
  languageFilter: boolean = false;
  config: any;
  content: any;
  
  constructor() { }
  
  ngOnInit() {
    this.config = { lineNumbers: false, mode: 'text/javascript' };
    this.content = `// Made with <3 by @christopherkade
function hello() {
  print('Hello World!');
}`;
  }
  
  // Create an img and display it in a new window for our user to copy or save
  saveSnippet() {
    const browser = detect();
    const element = document.getElementById('console');
    
    // Use foreignObjectRendeing only on chrome for better display of the text
    let options = {};
    if (browser && browser.name === 'chrome') {      
      options = {
        foreignObjectRendering: true
      };  
    }
    
    html2canvas(element, options).then(function(canvas) {
      const url = canvas.toDataURL();
      const img = '<img src="' + url + '" style="border:0;"></img>'
      const x = window.open();
      x.document.open();
      x.document.write(img);
      x.document.close();
    });
  }
  
  // Sets the right option for the selected language
  changeLanguage(language: string) {
    this.selectedLanguage = language;
    this.languageFilter = false;
    
    switch (language) {
      case 'Javascript':
      this.codemirrorComponent.instance.setOption('mode', 'text/javascript');
      break;
      case 'JSX':
      this.codemirrorComponent.instance.setOption('mode', 'text/jsx');
      break;
      case 'HTML':
      this.codemirrorComponent.instance.setOption('mode', 'text/xml');
      this.codemirrorComponent.instance.setOption('htmlMode', true);
      break;
      case 'CSS':
      this.codemirrorComponent.instance.setOption('mode', 'text/css');
      break;
      case 'Crystal':
      this.codemirrorComponent.instance.setOption('mode', 'text/x-crystal');
      break;
      case 'Python':
      this.codemirrorComponent.instance.setOption('mode', 'text/x-python');
      break;
    }
  }
  
  // Used to access the code mirror instance in our testing
  public get codemirror() {
    return this.codemirrorComponent;
  }
}
