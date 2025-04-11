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
        expect(areJSDOMNodesEqual(divdom, div)).toBe(true)

    })
})
