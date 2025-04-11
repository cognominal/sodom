import { JSDOM } from 'jsdom';

// a fake idom function that only handle string "<div"
export function idom(s: string, indent = 0, elt: HTMLElement | null = null): JSDOM {
    const dom = new JSDOM(``)
    const doc = dom.window.document

    // Basic implementation for a div
    if (s === "<div") {
        const div = doc.createElement('div')
        doc.body.appendChild(div)  // Add this line to append the div to body
        return dom
    }

    return dom
}

// fake sodom
export function sodom(dom: string, sodom: string): string {
    return ""
}


export function idomStr(s: string, indent = 0, elt: HTMLElement | null = null): string {
    return idom(s, indent, elt).serialize()
}



export function areJSDOMNodesEqual(node1: JSDOM | Node, node2: JSDOM | Node): boolean {
    // Get a reference to Node from JSDOM
    const dom = new JSDOM('');
    const { Node } = dom.window;

    // Convert JSDOM instances to their document nodes
    const n1 = node1 instanceof JSDOM ? node1.window.document : node1;
    const n2 = node2 instanceof JSDOM ? node2.window.document : node2;

    // Step 1: Check for reference equality
    if (n1 === n2) {
        return true;
    }

    // Step 2: Check node types
    if (!n1 || !n2 || n1.nodeType !== n2.nodeType) {
        return false;
    }

    // Step 3: Handle different node types
    if (n1.nodeType === Node.ELEMENT_NODE) {
        // Compare tag names
        if ((n1 as Element).tagName !== (n2 as Element).tagName) {
            return false;
        }

        // Compare attributes
        const attrs1 = (n1 as Element).attributes;
        const attrs2 = (n2 as Element).attributes;
        if (attrs1.length !== attrs2.length) {
            return false;
        }
        for (let i = 0; i < attrs1.length; i++) {
            const attr1 = attrs1[i];
            const attr2 = (n2 as Element).getAttribute(attr1.name);
            if (attr2 !== attr1.value) {
                return false;
            }
        }

        // Compare children
        const children1 = n1.childNodes;
        const children2 = n2.childNodes;
        if (children1.length !== children2.length) {
            return false;
        }
        for (let i = 0; i < children1.length; i++) {
            if (!areJSDOMNodesEqual(children1[i], children2[i])) {
                return false;
            }
        }

        return true;
    } else if (n1.nodeType === Node.TEXT_NODE || n1.nodeType === Node.COMMENT_NODE) {
        // Compare text or comment content
        return n1.textContent === n2.textContent;
    } else if (n1.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
        // Compare fragment children
        const children1 = n1.childNodes;
        const children2 = n2.childNodes;
        if (children1.length !== children2.length) {
            return false;
        }
        for (let i = 0; i < children1.length; i++) {
            if (!areJSDOMNodesEqual(children1[i], children2[i])) {
                return false;
            }
        }
        return true;
    }

    // Default case for unsupported node types
    return false;
}

// Generic match result type
type MatchResult<T> = {
    value: T;
    idx: number;
} | null;

// Generic match function type
type MatchFun<T> = (s: string, i: number) => MatchResult<T>;

const matchClass: MatchFun<string> = (s: string, i: number) => {
    return null;
}

const matchId: MatchFun<string> = (s: string, i: number) => {
    // Check if we're out of bounds or don't start with '#'
    if (i >= s.length || s[i] !== '#') {
        return null;
    }

    // Move past '#'
    let pos = i + 1;

    // Collect id until we hit a space
    let id = '';
    while (pos < s.length) {
        // TODO: Complete implementation
        return null;
    }
    return null;
}

const matchText: MatchFun<string> = (s: string, i: number) => {
    // Check if we're out of bounds or don't start with '<'
    if (i >= s.length || s[i] !== '<') {
        return null;
    }

    // Move past '<'
    let pos = i + 1;

    // Collect text until we hit a '<'
    let text = '';
    while (pos < s.length) {
        let c = s[pos];
        if (c === '\\') {
            text += ' ';
            pos++;
            continue;
        }

        if (c === '\n') {
            text += ' ';
            pos++;
            continue;
        }
        if (c === '<') {
            break;
        }
        text += c;
        pos++;
    }

    return null;
}

const matchTagStart: MatchFun<string> = (s: string, i: number) => {
    // Check if we're out of bounds or don't start with '<'
    if (i >= s.length || s[i] !== '<') {
        return null;
    }

    // Move past '<'
    let pos = i + 1;

    // Collect tag name
    let name = '';
    while (pos < s.length) {
        const char = s[pos];
        // Tag name ends at whitespace
        if (char === ' ') {
            break;
        }
        // Basic validation: allow letters, numbers, and '-' for tag names
        if (!/[a-zA-Z0-9-]/.test(char)) {
            return null; // Invalid character in tag name
        }
        name += char;
        pos++;
    }

    // If no name was collected, it's not a valid tag
    if (name.length === 0) {
        return null;
    }

    return { value: name, idx: pos };
}

