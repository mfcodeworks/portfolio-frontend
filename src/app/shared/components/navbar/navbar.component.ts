import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Navlink } from '../../core';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {

    @Input('color') color: string;
    isActive: BehaviorSubject<boolean> = new BehaviorSubject(false);

    navRoutes(): Navlink[] {
        return [{
            path: 'home',
            name: 'Home'
        }, {
            path: 'blog',
            name: 'Blog'
        }, {
            path: 'contact',
            name: 'Contact'
        }];
    }

    toggleActive(): void {
        this.isActive.next(!this.isActive.value);
    }

}
