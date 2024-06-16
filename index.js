class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.next = null;
    }
}

class Linkedlist {
    constructor(){
        this.head = null;
    }

    add(key, value){
        const newNode = new Node(key, value);
        if(!this.head){
            this.head = newNode;
            return;
        }
        let current = this.head;
        while(current.next) {
            if(current.value === key){
                current.value = value;
                return;
            }
            current = current.next;
        }
        if(current.key === key){
            current.value = value;
        } else {
            current.next = newNode;
        }
    }
    // Get the value for a key from the linked list
    get(key) {
        let current = this.head;
        while(current) {
            if(current.key === key){
                return current.value;
            }
            current = current.next;
        }
        return undefined;
    }
    // Delete akey-value pair from the linked list
    delete(key) {
        if(!this.head) return false;

        if(this.head.key === key) {
            this.head = this.head.next;
            return true;
        }
        let current = this.head;
        while(current.next){
            if(current.next.key === key){
                current.next = current.next.next;
                return true;
            }
            current = current.next;
        }
        return false;
    }
    // Checks if the linked list contains a key
    has(key) {
        let current = this.head;
        while(current) {
            if(current.key === key){
                return true;
            }
            current = current.next;
        }
        return false;
    }
    // Get all keys from the linked list
    keys(){
        let keysArray = [];
        let current = this.head;
        while(current){
            keysArray.push(current.key);
            current = current.next;
        }
        return keysArray;
    }
    // Get all values from the linked list
    values() {
        let valuesArray = [];
        let current = this.head;
        while(current) {
            valuesArray.push(current.value);
            current = current.next;
        }
        return valuesArray;
    }

    entries(){
        let entriesArray = [];
        let current = this.head;
        while(current){
            entriesArray.push([current.key, current.value]);
            current = current.next;
        }
        return entriesArray;
    }
}

class HashMap {

    constructor(size = 53, loadFactor = 0.75){
        this.length = 0;
        this.size = size;
        this.loadFactor = loadFactor;
        this.bucket = [];
        for(let i = 0; i < this.size; i++){
            this.buckets[i] = new Linkedlist();
        }
    }

    _hash(key){
        let total = 0;
        const PRIME = 31;
        for(let i = 0; i < Math.min(key.length, 100); i++){
            let char = key[i];
            let value = char.charCodeAt(0) - 96;
            total = (total * value) % this.size;
        }
        return total;
    }
    set(key, value){
        const index = this._hash(key);
        this.buckets[index].add(key, value);
        this.length++;

        if(this.length / this.size > this.loadFactor) {
            this.resize(this.size * 2);
        }
    }
    get(key){
        const index = this._hash(key);
        return this.buckets[index].get(key);
    }

    delete(key) {
        const index = this._hash(key);
        const deleted = this.buckets[index].delete(key);
        if(deleted){
            this.length--;
        }
        return deleted;
    }

    has(key) {
        const index = this._hash(key);
        return this.buckets[index].has(key);
    }

    keys() {
        let keysArray = [];
        for(let i = 0; i < this.size; i++){
            keysArray = keysArray.concat(this.buckets[i].keys());
        }
        return keysArray;
    }

    values(){
        let valuesArray = [];
        for(let i = 0; i < this.size; i++){
            valuesArray = valuesArray.concat(this.buckets[i].values());
        }
        return valuesArray;
    }

    entries(){
        let entriesArray = [];
        for(let i = 0; i < this.size; i++){
            entriesArray = entriesArray.concat(this.buckets[i].entries());
        }
        return entriesArray;
    }

    resize(newSize){
        const oldBuckets = this.buckets;
        this.size = newSize;
        this.length = 0;
        this.buckets = [];

        for(let i = 0; i < this.size; i++){
            this.buckets[i] = new Linkedlist();
        }
        
        for(let i = 0; i < oldBuckets.length; i++){
            let current = oldBuckets[i].head;
            while(current){
                this.set(current.key, current.value);
                current = current.next;
            }
        }
    }

    len(){
        return this.length;
    }
}

// Example
let map = new HashMap(16, 0.75);
map.set("Mag", "Nesium");
map.set("Gym", "Nesium");
map.set("Refer", "andum");
map.set("Tesla", "Motors");
map.set("Odin-", "Project");

for(let i = 0; i < 30; i++) {
    map.set(`Shark${i}, "Tank!"`);
    console.log(map.len());
    console.log(map.entries());
}

console.log(map);
console.log(map.keys());