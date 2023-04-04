import { MarkdownPipe } from "./markdown.pipe";

describe('MarkdownPipe', () => {

    it('marked down text with <p></p>', async () => {
        let pipe = new MarkdownPipe();
        let transfomed = await pipe.transform('abcd');
        expect(transfomed).toContain('<p>');
        expect(transfomed).toContain('</p>');
    });
})
