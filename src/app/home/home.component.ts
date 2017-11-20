import { Component, OnInit, ViewChild } from '@angular/core';
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import 'codemirror/mode/crystal/crystal'
import 'codemirror/mode/python/python'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/http/http'
import * as html2canvas from "html2canvas"
import { CodemirrorComponent } from 'ng2-codemirror';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  @ViewChild(CodemirrorComponent)
  private codemirrorComponent: CodemirrorComponent;
  config: any;
  content: any;
  languages = ['Javascript', 'HTML', 'CSS', 'Crystal', 'Python'];
  selectedLanguage = this.languages[0];
  languageFilter: boolean = false;

  constructor() { }

  ngOnInit() {
    this.config = { lineNumbers: false, mode: 'text/javascript' };
    this.content = `// Made with <3 by @christopherkade
function hello() {
  print('Hello World!');
}`
  }

  // TODO: Chose between iFrame and img
  // Create an iFrame and display it in a new window for our user to copy or save
  saveSnippet() {
    html2canvas(document.getElementsByClassName('console'), {
      onrendered: function(canvas) {
        var url = canvas.toDataURL()
        // var iframe = '<iframe src="' + img + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>'
        var img = '<img src="' + url + '" style="border:0;"></img>'
        var x = window.open();
        x.document.open();
        x.document.write(img);
        x.document.close();
      }
    });
  }

  changeLanguage(language: string) {
    this.selectedLanguage = language;
    this.languageFilter = false;

    switch (language) {
      case 'Javascript':
        this.codemirrorComponent.instance.setOption('mode', 'text/javascript');
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
}
