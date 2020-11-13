/* eslint-disable no-console */
/* eslint-disable indent */
class Node {
    //each node takes in the data and the pointer
    // data = value
    // pointer = next
    //note : next could be set to null by default, bc the last node is null, but currently it returns as und
    // ex: constructor(value, next = null) {
    constructor(value, next = null) {
        this.value = value;
        this.next = next;
    }
}
// //tests
// //shows a node object with the data 'ishi' and next as null?
// const test = new Node('ishi');
// console.log(test);

class LinkedList {
    constructor() {
        this.head = null; //aka the list is empty
        this.size = 1; //keeps track of the size of the list
    }

    //insert the head
    // takes in item (which is some form of data)

    insertFirst(item) {
        // set the head
        // instantiate node obj
        // pass in data (aka item)
        // then say next value will be this.head
        // the 2nd param is important bc 
        //if there's already something at the first node,
        // we're saying push that to the next position
        // and insert this as the first position
        this.head = new Node(item, this.head);
    }
    //pass in data (aka item)
    insertLast(item) {
        //could also just say if(!this.head)
        if (this.head === null) {
            this.insertFirst(item);
        } else {
            let tempNode = this.head;
            while (tempNode.next !== null) {
                tempNode = tempNode.next;
            }
            tempNode.next = new Node(item, null);

        }
        this.size++
    }

    printListData() {
        let current = this.head;
        //loops through all the nodes
        while (current) {
            console.log(current.data); //just looking at the data property
            current = current.next; // current is set to the next value
        }
    }

    insertLast2(data) {
        let node = new Node(data);
        let current;

        //if empty, make head
        if (!this.head) {
            this.head = node;
        } else {
            current = this.head;

            while (current.next) {
                current = current.next; //allows you to traverse through the list
            }

            current.next = node;
        }
        this.size++;
    }
}

const ll = new LinkedList();

// ll.insertFirst('selam');
// ll.insertFirst('buna');
// ll.insertLast2('thiye');
// ll.insertLast('thiye');

// ll.printListData(); // ask mentor

//tests insertFirst & insertLast
// console.log(ll);

module.exports = LinkedList;
