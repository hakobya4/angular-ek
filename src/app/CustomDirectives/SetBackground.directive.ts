import { Directive, ElementRef, Renderer2 } from "@angular/core";

@Directive({
    selector: '[setBackground]'
})

export class SetBackground{
    constructor(private element: ElementRef,  private renderer: Renderer2){

    }

    ngOnInit(){
        this.renderer.setStyle(this.element.nativeElement, 'backgroundColor','#36454F')
    }
}