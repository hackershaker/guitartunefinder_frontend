class CircularLinkedList {
    constructor(firstNode=null, lastNode=null, nodeNumber=0) {
        this.firstNode = firstNode;
        this.lastNode = lastNode;
        this.nodeNumber = nodeNumber;
    }

    append(node) {
        if(this.nodeNumber===0) {
            this.firstNode = node;
            this.lastNode = node;
        } else {
            node.prev = this.lastNode;
            node.next = this.firstNode;
            this.lastNode.next = node;
            this.firstNode.prev = node;
            this.lastNode = node;
        }
        this.nodeNumber += 1;
        
    }

    findNodebyValue(node, value) {
        if (node.value === value) {
            return node
        } else {
            return this.findNodebyValue(node.next, value)
        }
    } 

}

class Node {
    constructor(value) {
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

export {CircularLinkedList, Node};