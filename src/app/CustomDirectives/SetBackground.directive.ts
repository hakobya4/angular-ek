import { Directive, ElementRef, Input, Renderer2 } from "@angular/core";

@Directive({
    selector: '[setBackground]'
})

export class SetBackground{
    @Input('setBackground') changeTextAndBackColor:{backColor:string, textColor:string}
    constructor(private element: ElementRef,  private renderer: Renderer2){

    }

    ngOnInit(){
        this.renderer.setStyle(this.element.nativeElement, 'backgroundColor',this.changeTextAndBackColor.backColor)
        this.renderer.setStyle(this.element.nativeElement, 'color',this.changeTextAndBackColor.textColor)
    }
}