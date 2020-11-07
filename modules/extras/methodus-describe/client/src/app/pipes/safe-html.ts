import { DomSanitizer } from '@angular/platform-browser';
import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'safeHtml' })
export class SafeHtmlPipe implements PipeTransform {
    constructor(private readonly sanitized: DomSanitizer) { }
    transform(value): string {
        return this.sanitized.bypassSecurityTrustHtml(value) as string;
    }
}
