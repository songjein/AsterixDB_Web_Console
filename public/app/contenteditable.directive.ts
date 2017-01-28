/**
*	(reference)
* https://www.namekdev.net/2016/01/two-way-binding-to-contenteditable-element-in-angular-2/
*	http://stackoverflow.com/questions/39023701/angular-2-contenteditable
*	http://stackoverflow.com/questions/39658186/angular-2-component-directive-not-working
*/

import {
	Directive, ElementRef, Input, 
	Output, EventEmitter, OnChanges
} from "@angular/core";

@Directive({
    selector: '[contenteditableModel]',
    host: {
        '(blur)': 'onEdit()',
        '(keyup)': 'onEdit()'
    }
})

export class ContenteditableDirective implements OnChanges {
    @Input('contenteditableModel') model: any;
    @Output('contenteditableModelChange') update = new EventEmitter();

    constructor(
        private elementRef: ElementRef
    ) {
        console.log('ContentEditableDirective.constructor');
    }

    ngOnChanges(changes) {
        console.log('ContentEditableDirective.ngOnChanges');
        console.log(changes);
        if (changes.model.isFirstChange())
            this.refreshView();
    }

    onEdit() {
        console.log('ContentEditableDirective.onEdit');
        var value = this.elementRef.nativeElement.innerText
        this.update.emit(value)
    }

    private refreshView() {
        console.log('ContentEditableDirective.refreshView');
        this.elementRef.nativeElement.textContent = this.model
    }
}
