/* eslint-disable indent */
const llService = {

    createList(ll, words) {
        // creates SLL with words
        for (let i = 0; i < words.length; i++) {
            ll.insertLast(words[i]);
        }
        return ll;
    },

    correctGuess(ll) {
        let currNode = ll.head;
        let previousNode = ll.head;
        let tempNode = ll.head;
        let positionCount = 0;
        let position = 0;
        currNode.value.memory_value = currNode.value.memory_value * 2;
        position = currNode.value.memory_value;
        currNode.value.correct_count++;
        while ((currNode.next !== null) && (positionCount !== position)) {
            previousNode = currNode;
            currNode = currNode.next;
            positionCount++;
        }

        ll.head = ll.head.next;
        tempNode.next = currNode.next;
        currNode.next = tempNode;

        if (!tempNode.next) {
            tempNode.value.next = null;
        } else {
            tempNode.value.next = tempNode.next.value.id;
        }
        currNode.value.next = tempNode.value.id;
        ll.head.value.next = ll.head.next.value.id;

    },

    incorrectGuess(ll) {
        let currNode = ll.head;
        let nextNode = ll.head.next;
        let tempNode = nextNode.next;
        currNode.value.memory_value = 1;
        currNode.value.incorrect_count++;
        ll.head = nextNode;
        ll.head.next = currNode;
        currNode.next = tempNode;
        nextNode.value.next = currNode.value.id;
        currNode.value.next = tempNode.value.id;
    },

};

module.exports = llService;