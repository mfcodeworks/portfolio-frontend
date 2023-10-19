import { Component, ChangeDetectionStrategy, Input, AfterViewChecked } from '@angular/core';
import { tns, TinySliderInstance, TinySliderSettings } from "tiny-slider";
import { Slide } from '../../core';

@Component({
    selector: 'app-tool-slider',
    templateUrl: './tool-slider.component.html',
    styleUrls: ['./tool-slider.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolSliderComponent implements AfterViewChecked {
    @Input('tools') tools: Slide[];
    @Input('options') options: TinySliderSettings;
    defaultOptions: TinySliderSettings = {
        controls: false,
        nav: false,
        responsive: {
            350: {
                items: 2
            },
            500: {
                items: 4
            },
            768: {
                items: 5
            }
        },
        autoplay: true,
        autoplayTimeout: 3500,
        autoplayButtonOutput: false,
        swipeAngle: false,
        speed: 1200
    };
    slider: TinySliderInstance;

    ngAfterViewChecked(): void {
        switch (true) {
            case this.tools && !this.slider:
                this.slider = this.startSlider();
                break;

            case this.tools && !!this.slider:
                this.slider.destroy();
                this.slider = null;
                this.slider = this.startSlider();
                break;
        }
    }

    startSlider(): TinySliderInstance {
        return tns(this.options || this.defaultOptions);
    }
}
