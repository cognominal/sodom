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



export function areJSDOMNodesEqual(node1: JSDOM | Node, node2: JSDOM | Node, log = false): boolean {
    // Get a reference to Node from JSDOM
    const { Node } = new JSDOM('').window;

    // Convert JSDOM instances to their document nodes
    const n1 = node1 instanceof JSDOM ? node1.window.document : node1;
    const n2 = node2 instanceof JSDOM ? node2.window.document : node2;

    // Handle null or undefined nodes
    if (!n1 || !n2) {
        if (log) console.log("One or both nodes are null or undefined");
        return false;
    }

    // Step 1: Check for reference equality
    if (n1 === n2) {
        return true;
    }

    // Step 2: Check node types
    if (n1.nodeType !== n2.nodeType) {
        if (log) console.log(`Node type mismatch: ${n1.nodeType} !== ${n2.nodeType}`);
        return false;
    }

    // Step 3: Handle different node types
    if (n1.nodeType === Node.ELEMENT_NODE) {
        const tag1 = (n1 as Element).tagName;
        const tag2 = (n2 as Element).tagName;

        // Compare tag names
        if (tag1 !== tag2) {
            if (log) console.log(`Tag name mismatch: ${tag1} !== ${tag2}`);
            return false;
        }

        // Compare attributes
        const attrs1 = (n1 as Element).attributes;
        const attrs2 = (n2 as Element).attributes;

        if (attrs1.length !== attrs2.length) {
            if (log) console.log("Attribute length mismatch");
            return false;
        }

        for (let i = 0; i < attrs1.length; i++) {
            const attr1 = attrs1[i];
            const attr2 = (n2 as Element).getAttribute(attr1.name);
            if (attr2 !== attr1.value) {
                if (log) console.log(`Attribute mismatch: ${attr1.name}="${attr1.value}" !== "${attr2}"`);
                return false;
            }
        }

        // Compare children
        const children1 = n1.childNodes;
        const children2 = n2.childNodes;

        if (children1.length !== children2.length) {
            if (log) console.log("Child node length mismatch");
            return false;
        }

        for (let i = 0; i < children1.length; i++) {
            if (!areJSDOMNodesEqual(children1[i], children2[i], log)) {
                return false;
            }
        }

        return true;
    } else if (n1.nodeType === Node.TEXT_NODE || n1.nodeType === Node.COMMENT_NODE) {
        // Compare text or comment content
        if (n1.textContent !== n2.textContent) {
            if (log) console.log(`Text content mismatch: "${n1.textContent}" !== "${n2.textContent}"`);
            return false;
        }
        return true;
    } else if (n1.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
        // Compare fragment children
        const children1 = n1.childNodes;
        const children2 = n2.childNodes;

        if (children1.length !== children2.length) {
            if (log) console.log("Document fragment child node length mismatch");
            return false;
        }

        for (let i = 0; i < children1.length; i++) {
            if (!areJSDOMNodesEqual(children1[i], children2[i], log)) {
                return false;
            }
        }

        return true;
    }

    // Default case for unsupported node types
    if (log) console.log(`Unsupported node type: ${n1.nodeType}`);
    return false;
}

