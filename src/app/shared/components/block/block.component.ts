import { Component, Input, OnChanges, ChangeDetectionStrategy, OnInit, AfterViewChecked } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import blocksToHtml from '@sanity/block-content-to-html';
import { environment } from '../../../../environments/environment';

declare var Prism;
const h = blocksToHtml.h;

@Component({
    selector: 'app-block',
    templateUrl: './block.component.html',
    styleUrls: ['./block.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlockComponent implements OnChanges, AfterViewChecked {
    @Input('block') block: any;

    // Post-rendered body HTML
    bodyHtml: BehaviorSubject<SafeHtml> = new BehaviorSubject({});

    // URL Link Renderer
    linkRenderer = props => (
        h('a', {
            className: 'has-text-weight-medium has-text-grey-darker',
            style: 'text-decoration: underline;'
        }, props.children)
    );

    // Code Snippet Renderer
    codeRenderer = props => {
        console.log(props.node);
        props.node.language = this.jsToTs(props.node.language);
        return h('pre', {className: `line-numbers language-${props.node.language}`},
            h('code', {innerHTML: Prism.highlight(props.node.code, Prism.languages[props.node.language])})
        )
    };

    // Standard Block Renderer
    blockRenderer = props => {
        switch (props.node.style) {
            case 'h1':
                return h('h1', {className: `title is-1`}, props.children);

            case 'h2':
                return h('h2', {className: `title is-2`}, props.children);

            case 'h3':
                return h('h3', {className: `title is-3`}, props.children);

            case 'h4':
                return h('h4', {className: `title is-4`}, props.children);

            case 'blockquote':
                return h('blockqoute', {className: 'subtitle is-2'}, props.children);

            default:
                return h('p', null, props.children);
        }
    };

    constructor(private sanitizer: DomSanitizer) {}

    ngOnChanges(): void {
        // Use sanity block to HTML
        const pureHtml = blocksToHtml({
            blocks: this.block,
            serializers: {
                types: {
                    code: this.codeRenderer,
                    block: this.blockRenderer
                },
                marks: {
                    link: this.linkRenderer
                }
            },
            ...environment.sanity,
            className: 'block-content is-size-5'
        });

        // Sanitize generated HTML
        this.bodyHtml.next(this.sanitizer.bypassSecurityTrustHtml(pureHtml));
    }

    ngAfterViewChecked(): void {
        // Add line numbering after view is loaded
        Prism.highlightAll();
    }

    // Implicitly set JS to TS
    jsToTs(str: string): string {
        return str.replace('javascript', 'typescript').replace('js', 'ts');
    }
}
