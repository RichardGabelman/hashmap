import { LinkedList } from "./linkedList.mjs";

const MIN_SIZE = 16;

export class HashMap {
  constructor() {
    this.loadFactor = 0.75;
    this.size = 0;
    this.capacity = MIN_SIZE;
    this.buckets = new Array(capacity);
    for (let i = 0; i < this.capacity; i++) {
      this.buckets[i] = new LinkedList();
    }
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    const index = hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }

    const bucket = this.buckets[index];

    if (bucket.containsKey(key)) {
      const existingNode = bucket.findKey(key);
      existingNode.value = value;
      return;
    }

    bucket.append(key, value);
    this.size++;
    if (this.size > (this.loadFactor * this.capacity)) {
      this.updateSize();
    }
    return;
  }

  get(key) {
    const index = hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }

    const bucket = this.buckets[index];

    const nodeIndex = bucket.findKey(key);

    if (nodeIndex == null) {
      return null;
    }

    return bucket.atIndex(nodeIndex).value;
  }

  has(key) {
    const index = hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }

    const bucket = this.buckets[index];

    return bucket.containsKey(key);
  }

  remove(key) {
    const index = hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }

    const bucket = this.buckets[index];

    if (bucket.containsKey(key)) {
      const nodeIndex = bucket.findKey;
      bucket.removeAt(nodeIndex);
      this.size--;
      return true;
    }
    return false;
  }

  length() {
    return this.size;
  }

  clear(newCapacity = MIN_SIZE) {
    this.capacity = newCapacity;
    this.buckets = new Array(this.capacity);
    this.size = 0;

    for (let i = 0; i < this.buckets.length; i++) {
      this.buckets[i] = new LinkedList();
    }
  }

  keys() {
    let keys = [];

    for (let i = 0; i < this.buckets.length; i++) {
      let currBucketKeys = this.buckets[i].getKeys();
      for (let n = 0; n < currBucketKeys.length; n++) {
        keys.push(currBucketKeys[n]);
      }
    }

    return keys;
  }

  values() {
    let values = [];

    for (let i = 0; i < this.buckets.length; i++) {
      let currBucketValues = this.buckets[i].getValues();
      for (let n = 0; n < currBucketValues.length; n++) {
        values.push(currBucketValues[n]);
      }
    }

    return values;
  }

  entries() {
    let keys = this.keys();
    let values = this.values();

    let entries = [];

    for (let i = 0; i < keys.length; i++) {
      const newPair = [];
      newPair.append(keys[i]);
      newPair.append(values[i]);
      entries.append(newPair);
    }

    return entries;
  }

  updateSize() {
    const entries = this.entries();
    const currCapacity = this.capacity;
    const newCapacity = currCapacity * 2;

    this.clear();
    for (let i = 0; i < entries.length; i++) {
      const key = entries[i][0];
      const value = entries[i][1];
      this.set(key, value);
    }

    return;
  }
}
