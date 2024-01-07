import { Directive, ElementRef, Input, Renderer2 } from "@angular/core";

@Directive({
    selector: '[setBackground]'
})

export class SetBackground{
    @Input('setBackground') backColor:string='#36454F'
    @Input() textColor:string='black'
    constructor(private element: ElementRef,  private renderer: Renderer2){

    }

    ngOnInit(){
        this.renderer.setStyle(this.element.nativeElement, 'backgroundColor',this.backColor)
        this.renderer.setStyle(this.element.nativeElement, 'color',this.textColor)
    }
}