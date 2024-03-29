import { Component, Input, OnChanges, ChangeDetectionStrategy, AfterViewChecked } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import blocksToHtml from '@sanity/block-content-to-html';
import { environment } from '../../../../environments/environment';

declare var Prism;
const {h, getImageUrl} = blocksToHtml;

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

    // Image Renderer
    imageRenderer = props => {
        if (!props.node.asset) {
            return null
        }

        const img = h('img', {src: getImageUrl(props), loading:'lazy'})
        return props.isInline ? img : h('figure', null, img)
    }

    // URL Link Renderer
    linkRenderer = props => (
        h('a', {
            className: 'has-text-weight-medium has-text-grey-darker has-text-underlined',
            href: props.mark.href,
            target: '_blank'
        }, props.children)
    );

    // Code Snippet Renderer
    codeRenderer = props => {
        // console.debug('CODE RENDERER PROPS:', props)
        // props.node.language = this.languageModifier(props.node.language);
        return h('pre', {className: `${props.node.code.indexOf('\n') > -1 && 'line-numbers'} language-${this.languageModifier(props.node.language)}`},
            h('code', {innerHTML: Prism.highlight(props.node.code, Prism.languages[this.languageModifier(props.node.language)], this.languageModifier(props.node.language))})
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
                return h('p', props.children);
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
                    block: this.blockRenderer,
                    image: this.imageRenderer
                },
                marks: {
                    link: this.linkRenderer
                }
            },
            ...environment.sanity,
            className: 'block-content is-size-5 is-size-6-mobile styled-list'
        });

        // Sanitize generated HTML
        this.bodyHtml.next(this.sanitizer.bypassSecurityTrustHtml(pureHtml));
    }

    ngAfterViewChecked(): void {
        // Add line numbering after view is loaded
        Prism.highlightAll();
    }

    // Modify language input for prism.js
    languageModifier(str: string): string {
        return str.replace(/^javascript$/, 'typescript')
            .replace(/^js$/, 'ts')
            .replace(/^sh$/, 'bash');
    }
}
