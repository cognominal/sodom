import { describe, it, expect, beforeEach } from 'vitest'
import { JSDOM } from 'jsdom'
import { idom, areJSDOMNodesEqual } from './sodom'

let divhtml: string
let divdom: JSDOM
let divStr: string

beforeEach(() => {
    divStr = '<div></div>'
    divhtml = '<html><head></head><body><div></div></body></html>'
    divdom = new JSDOM(divhtml)
})

describe('areJSDOMNodesEqual', () => {
    it('should compare simple div elements', () => {
        const dom = new JSDOM(`<div></div>`)
        const doms = dom.serialize()
        expect(doms).toBe(divhtml)
    })

    it('should compare idom generated div with direct div', () => {
        const div = idom("<div")
        expect(areJSDOMNodesEqual(divdom, div, true)).toBe(true)

    })
})
describe('areJSDOMNodesEqual', () => {
    it('should return true for identical simple div elements', () => {
        const dom1 = new JSDOM('<div></div>');
        const dom2 = new JSDOM('<div></div>');
        expect(areJSDOMNodesEqual(dom1, dom2)).toBe(true);
    });

    it('should return false for div elements with different attributes', () => {
        const dom1 = new JSDOM('<div id="test"></div>');
        const dom2 = new JSDOM('<div></div>');
        expect(areJSDOMNodesEqual(dom1, dom2)).toBe(false);
    });

    it('should return false for different tag names', () => {
        const dom1 = new JSDOM('<div></div>');
        const dom2 = new JSDOM('<span></span>');
        expect(areJSDOMNodesEqual(dom1, dom2)).toBe(false);
    });

    it('should return true for nested identical elements', () => {
        const dom1 = new JSDOM('<div><span>Text</span></div>');
        const dom2 = new JSDOM('<div><span>Text</span></div>');
        expect(areJSDOMNodesEqual(dom1, dom2)).toBe(true);
    });

    it('should return false for nested elements with different text content', () => {
        const dom1 = new JSDOM('<div><span>Text1</span></div>');
        const dom2 = new JSDOM('<div><span>Text2</span></div>');
        expect(areJSDOMNodesEqual(dom1, dom2)).toBe(false);
    });

    it('should return true for identical elements created with idom', () => {
        const dom1 = idom('<div');
        const dom2 = idom('<div');
        expect(areJSDOMNodesEqual(dom1, dom2)).toBe(true);
    });

    it('should return false for elements with different numbers of children', () => {
        const dom1 = new JSDOM('<div><span></span></div>');
        const dom2 = new JSDOM('<div></div>');
        expect(areJSDOMNodesEqual(dom1, dom2)).toBe(false);
    });

    it('should return true for identical text nodes', () => {
        const dom1 = new JSDOM('<div>Text</div>');
        const dom2 = new JSDOM('<div>Text</div>');
        expect(areJSDOMNodesEqual(dom1.window.document.body.firstChild, dom2.window.document.body.firstChild)).toBe(true);
    });

    it('should return false for different text nodes', () => {
        const dom1 = new JSDOM('<div>Text1</div>');
        const dom2 = new JSDOM('<div>Text2</div>');
        expect(areJSDOMNodesEqual(dom1.window.document.body.firstChild, dom2.window.document.body.firstChild)).toBe(false);
    });

    it('should return true for identical document fragments', () => {
        const fragment1 = new JSDOM('').window.document.createDocumentFragment();
        const fragment2 = new JSDOM('').window.document.createDocumentFragment();
        const div1 = new JSDOM('<div></div>').window.document.body.firstChild;
        const div2 = new JSDOM('<div></div>').window.document.body.firstChild;
        fragment1.appendChild(div1!);
        fragment2.appendChild(div2!);
        expect(areJSDOMNodesEqual(fragment1, fragment2)).toBe(true);
    });
});
