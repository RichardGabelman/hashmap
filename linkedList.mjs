import { Node } from "./node.mjs";

export class LinkedList {
  constructor() {
    this.head = null;
  }

  append(value) {
    const tail = new Node();
    tail.value = value;

    if (this.head == null) {
      this.head = tail;
      return;
    }

    this.tail().nextNode = tail;
  }

  prepend(value) {
    const head = new Node();
    head.value = value;

    head.nextNode = this.head;
    this.head = head;
  }

  size() {
    let size = 0;
    let curr = this.head;

    while (curr) {
      size++;
      curr = curr.nextNode;
    }
    return size;
  }

  head() {
    return this.head;
  }

  tail() {
    let curr = this.head;

    while (curr.nextNode) {
      curr = curr.nextNode;
    }
    return curr;
  }

  atIndex(index) {
    let curr = this.head;

    for (let i = 0; i < index; i++) {
      if (curr.nextNode == null) {
        console.log("Linked list doesn't have that index!");
        return;
      }
      curr = curr.nextNode;
    }

    return curr;
  }

  pop() {
    if (this.head.nextNode == null) {
      console.log("Can't pop the head!");
      return;
    }
    let curr = this.head;

    while (curr.nextNode != this.tail()) {
      curr = curr.nextNode;
    }
    const popped = this.tail();
    curr.nextNode = null;
    return curr;
  }

  contains(value) {
    let curr = this.head;

    while (curr.nextNode) {
      if (curr.value == value) {
        return true;
      }
      curr = curr.nextNode;
    }
    return false;
  }

  find(value) {
    let index = 0;
    let curr = this.head;

    while (curr.nextNode) {
      if (curr.value == value) {
        return index;
      }
      curr = curr.nextNode;
      index++;
    }
    return null;
  }

  toString() {
    let string = "";
    let curr = this.head;

    while (curr) {
      string = string + `( ${curr.value} ) -> `;
      curr = curr.nextNode;
    }

    string = string + `null`;
    return string;
  }

  insertAt(value, index) {
    if (index == 0) {
      this.prepend(value);
      return;
    }
    if (index >= this.size()) {
      this.append(value);
      return;
    }
    const newNode = new Node();
    newNode.value = value;
    newNode.nextNode = this.atIndex(index);

    let curr = this.head;

    while (curr.nextNode != this.atIndex(index)) {
      curr = curr.nextNode;
    }
    curr.nextNode = newNode;
  }

  removeAt(index) {
    if (index >= this.size()) {
      return;
    }

    let curr = this.head;

    while (curr.nextNode != this.atIndex(index)) {
      curr = curr.nextNode;
    }

    let nextAfter = this.atIndex(index).nextNode;
    curr.nextNode = nextAfter;
  }
}
