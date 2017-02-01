/**
 * Integrating codemirror (using ng2-codemirror) with our application
 *
 * component from "https://runkit.com/npm/ng2-codemirror"
 *                "https://www.npmjs.com/package/ng2-codemirror"
 * copy component from /src/codemirror.component.ts 
 * for custom mode (asterix aql, sql++ code hilighting)
 * 
 * therefore, actually we don't need to "npm install ng2-codemirror"
 * 
 * Because on the outside of this component, 
 * It was really hard to access the codemirror instance that ng-codemirror use
 * So, we copied the component in our application and modified it
 * 
 * "codemirror.js(^5.23.0)" is included in the "index.html"
 * And in this component(codemirror.component.ts) 
 * add statement like "declare var CodeMirror: any;"
 *
 * I don't know whether this is right way
 * 
 * ref 1) usage : https://embed.plnkr.co/8e9gxss9u10VeFrv29Zt/ 
 * ref 2) custom mode : http://jsfiddle.net/TcqAf/99/
 * ref 3) integrating : http://stackoverflow.com/questions/37092142/integrating-codemirror-with-angular2-typescript
 * ref 3) integrating :  https://medium.com/@s_eschweiler/using-external-libraries-with-angular-2-87e06db8e5d1#.8ok74uvwg
 */

// Imports
import {
  Component,
  Input,
  Output,
  ElementRef,
  ViewChild,
  EventEmitter,
  forwardRef
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

//import * as CodeMirror from 'codemirror';
declare var CodeMirror: any;

/**
 * CodeMirror component
 * Usage :
 * <codemirror [(ngModel)]="data" [config]="{...}"></codemirror>
 */
@Component({
  selector: 'codemirror',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CodemirrorComponent),
      multi: true
    }
  ],
  template: `<textarea #host></textarea>`,
})
export class CodemirrorComponent {

  @Input() config;
  @Output() change = new EventEmitter();
  @Output() focus = new EventEmitter();
  @Output() blur = new EventEmitter();

  @ViewChild('host') host;

  @Output() instance = null;

  _value = '';

  /**
   * Constructor
   */
  constructor(){
	}

  get value() { return this._value; };

  @Input() set value(v) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
    }
  }

  /**
   * On component destroy
   */
  ngOnDestroy(){

  }

  /**
   * On component view init
   */
  ngAfterViewInit(){
    this.config = this.config || {};
    this.codemirrorInit(this.config);
  }

  /**
   * Initialize codemirror
   */
  codemirrorInit(config){
    this.instance = CodeMirror.fromTextArea(this.host.nativeElement, config);
    this.instance.setValue(this._value);

    this.instance.on('change', () => {
      this.updateValue(this.instance.getValue());
    });

    this.instance.on('focus', () => {
      this.focus.emit();
    });

    this.instance.on('blur', () => {
      this.blur.emit();
    });
  }

  /**
   * Value update process
   */
  updateValue(value){
    this.value = value;
    this.onTouched();
    this.change.emit(value);
  }

  /**
   * Implements ControlValueAccessor
   */
  writeValue(value){
    this._value = value || '';
    if (this.instance) {
      this.instance.setValue(this._value);
    }
  }
  onChange(_){}
  onTouched(){}
  registerOnChange(fn){this.onChange = fn;}
  registerOnTouched(fn){this.onTouched = fn;}
}
