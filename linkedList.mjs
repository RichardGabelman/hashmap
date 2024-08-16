import { Node } from "./node.mjs";

export class LinkedList {
  constructor() {
    this.head = null;
  }

  append(key, value) {
    const tail = new Node();
    tail.key = key;
    tail.value = value;

    if (this.head == null) {
      this.head = tail;
      return;
    }

    this.tail().nextNode = tail;
  }

  prepend(key, value) {
    const head = new Node();
    head.key = key;
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

  containsKey(key) {
    let curr = this.head;

    while (curr) {
      if (curr.key == key) {
        return true;
      }
      curr = curr.nextNode;
    }
    return false;
  }

  findKey(key) {
    let index = 0;
    let curr = this.head;

    while (curr) {
      if (curr.key == key) {
        return index;
      }
      curr = curr.nextNode;
      index++;
    }
    return null;
  }

  containsVal(value) {
    let curr = this.head;

    while (curr) {
      if (curr.value == value) {
        return true;
      }
      curr = curr.nextNode;
    }
    return false;
  }

  findVal(value) {
    let index = 0;
    let curr = this.head;

    while (curr) {
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

  insertAt(key, value, index) {
    if (index == 0) {
      this.prepend(key, value);
      return;
    }
    if (index >= this.size()) {
      this.append(key, value);
      return;
    }
    const newNode = new Node();
    newNode.key = key;
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
    if (index == 0) {
      this.head = this.head.nextNode;
      return;
    }

    let curr = this.head;

    while (curr.nextNode != this.atIndex(index)) {
      curr = curr.nextNode;
    }

    let nextAfter = this.atIndex(index).nextNode;
    curr.nextNode = nextAfter;
  }

  getKeys() {
    let keys = [];
    let curr = this.head;

    while (curr) {
      keys.push(curr.key);
      curr = curr.nextNode;
    }

    return keys;
  }

  getValues() {
    let values = [];
    let curr = this.head;

    while (curr) {
      values.push(curr.value);
      curr = curr.nextNode;
    }

    return values;
  }
}
