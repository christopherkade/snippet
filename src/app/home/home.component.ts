import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/mode/crystal/crystal';
import 'codemirror/mode/python/python';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/http/http';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/mode/ruby/ruby';
import 'codemirror/mode/swift/swift';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CodemirrorComponent } from 'ng2-codemirror';
import * as html2canvas from '../../assets/html2canvas.min.js';
import { detect } from 'detect-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  // List of languages supported by Snippet
  languages = [
    {
      name: 'Javascript',
      code: 'text/javascript'
    },
    {
      name: 'JSX',
      code: 'text/jsx'
    },
    {
      name: 'HTML',
      code: 'text/xml'
    },
    {
      name: 'CSS',
      code: 'text/css'
    },
    {
      name: 'Crystal',
      code: 'text/x-crystal'
    },
    {
      name: 'Python',
      code: 'text/x-python'
    },
    {
      name: 'Ruby',
      code: 'text/x-ruby'
    },
    {
      name: 'Swift',
      code: 'text/x-swift'
    }
  ];
  // Codemirror component used to change the text editor
  @ViewChild(CodemirrorComponent)
  private codemirrorComponent: CodemirrorComponent; 
  // Language selected by the user
  selectedLanguage = this.languages[0];
  // Configuration used by codemirror
  config: any;
  // Content of the text editor
  content: any;
  
  constructor() { }
  
  ngOnInit() {
    this.config = { lineNumbers: false, mode: this.selectedLanguage.code };
    this.content = 
`// Made with <3 by @christopherkade
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
        useCORS: true,
        foreignObjectRendering: true
      };  
    }
    
    // Call html2canvas to render the console and display it in a new window
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
  changeLanguage(language: any) {
    this.selectedLanguage = language;
    this.codemirrorComponent.instance.setOption('mode', language.code);
  }
  
  // Used to access the code mirror instance in our testing
  public get codemirror() {
    return this.codemirrorComponent;
  }
}
