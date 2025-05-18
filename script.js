document.addEventListener('DOMContentLoaded', () => {
    const questionsListDiv = document.getElementById('questions-list');
    const hintModal = document.getElementById('hint-modal');
    const hintQuestionTitle = document.getElementById('hint-question');
    const hintContentDiv = document.getElementById('hint-content');
    const closeBtn = document.querySelector('.close-btn');

    // Complete list of Fasal coding questions with hints and answers
    const fasalQuestions = [
        // ... (your existing question array remains the same)
        {
    "question": "Implement LRU Cache",
    "description": "Design and implement a data structure for Least Recently Used (LRU) cache. It should support the following operations: get(key) - Get the value (will always be positive) of the key if the key exists in the cache, otherwise return -1. put(key, value) - Set or insert the value if the key is not already present. When the cache reached its capacity, it should invalidate the least recently used item before inserting a new item. The cache is initialized with a positive capacity.",
    "hint": "Use a hash map for quick lookups and a doubly linked list to maintain the order of usage.",
    "answer": `
        <p><strong>Solution Approach:</strong></p>
        <p>Use a hash map to store key-value pairs for O(1) average time complexity for get and put. Use a doubly linked list to maintain the order of keys based on their last access time. The head of the list will be the most recently used key, and the tail will be the least recently used. When a key is accessed or inserted, move its corresponding node to the head of the list. When the capacity is reached, remove the tail node (least recently used).</p>

        <pre><code>class LRUCache {
            constructor(capacity) {
                this.capacity = capacity;
                this.cache = new Map();
                this.head = new Node(0, 0);
                this.tail = new Node(0, 0);
                this.head.next = this.tail;
                this.tail.prev = this.head;
            }

            get(key) {
                if (!this.cache.has(key)) {
                    return -1;
                }
                const node = this.cache.get(key);
                this._moveToHead(node);
                return node.value;
            }

            put(key, value) {
                if (this.cache.has(key)) {
                    const node = this.cache.get(key);
                    node.value = value;
                    this._moveToHead(node);
                } else {
                    const newNode = new Node(key, value);
                    this.cache.set(key, newNode);
                    this._addToHead(newNode);
                    if (this.cache.size > this.capacity) {
                        const tail = this._popTail();
                        this.cache.delete(tail.key);
                    }
                }
            }

            _addToHead(node) {
                node.prev = this.head;
                node.next = this.head.next;
                this.head.next.prev = node;
                this.head.next = node;
            }

            _removeNode(node) {
                const prev = node.prev;
                const next = node.next;
                prev.next = next;
                next.prev = prev;
            }

            _moveToHead(node) {
                this._removeNode(node);
                this._addToHead(node);
            }

            _popTail() {
                const tail = this.tail.prev;
                this._removeNode(tail);
                return tail;
            }
        }

        class Node {
            constructor(key, value) {
                this.key = key;
                this.value = value;
                this.prev = null;
                this.next = null;
            }
        }</code></pre>

        <p><strong>Time Complexity:</strong> O(1) for get and put operations on average due to the hash map.</p>
        <p><strong>Space Complexity:</strong> O(capacity) - for the hash map and the doubly linked list.</p>
    `
  },
  {
    "question": "Reverse a String",
    "description": "Write a function that reverses a given string.",
    "hint": "Consider iterating from the end of the string or using built-in string manipulation methods.",
    "answer": `
        <p><strong>Solution Approach (Iterative):</strong></p>
        <p>Create an empty string. Iterate through the input string from the last character to the first, appending each character to the new string.</p>

        <pre><code>function reverseString(str) {
            let reversedStr = "";
            for (let i = str.length - 1; i >= 0; i--) {
                reversedStr += str[i];
            }
            return reversedStr;
        }</code></pre>

        <p><strong>Time Complexity:</strong> O(n) - where n is the length of the string.</p>
        <p><strong>Space Complexity:</strong> O(n) - for the new reversed string.</p>
    `
  },
  {
    "question": "Count the Occurrences of Each Character in a String",
    "description": "Write a function that takes a string as input and returns an object or map containing the count of each character in the string.",
    "hint": "Iterate through the string and use a hash map (or a plain JavaScript object) to store the counts.",
    "answer": `
        <p><strong>Solution Approach:</strong></p>
        <p>Create an empty object (or map). Iterate through the input string character by character. For each character, if it's already a key in the object, increment its value (count). Otherwise, add the character as a new key with a value of 1.</p>

        <pre><code>function countCharacterOccurrences(str) {
            const charCounts = {};
            for (const char of str) {
                charCounts[char] = (charCounts[char] || 0) + 1;
            }
            return charCounts;
        }</code></pre>

        <p><strong>Time Complexity:</strong> O(n) - where n is the length of the string.</p>
        <p><strong>Space Complexity:</strong> O(k) - where k is the number of unique characters in the string.</p>
    `
  },
  {
    "question": "Implement a Basic Calculator (Addition and Subtraction)",
    "description": "Implement a basic calculator to evaluate a simple expression string containing only non-negative integers, '+', '-', '(', ')', and empty spaces.",
    "hint": "Use a stack to handle the parentheses and signs.",
    "answer": `
        <p><strong>Solution Approach (Stack-based):</strong></p>
        <p>Iterate through the string. Maintain a current number and a sign. When you encounter a digit, build the number. When you encounter '+' or '-', update the result with the current number and sign, and reset the current number and sign. Use a stack to store the result and sign when encountering '(', and restore them when encountering ')'.</p>

        <pre><code>function calculateBasic(s) {
            let result = 0;
            let sign = 1;
            let num = 0;
            const stack = [];

            for (let i = 0; i < s.length; i++) {
                const char = s[i];
                if (!isNaN(parseInt(char))) {
                    num = num * 10 + parseInt(char);
                } else if (char === '+') {
                    result += sign * num;
                    num = 0;
                    sign = 1;
                } else if (char === '-') {
                    result += sign * num;
                    num = 0;
                    sign = -1;
                } else if (char === '(') {
                    stack.push(result);
                    stack.push(sign);
                    result = 0;
                    sign = 1;
                } else if (char === ')') {
                    result += sign * num;
                    num = 0;
                    result *= stack.pop(); // Pop the sign
                    result += stack.pop(); // Pop the previous result
                }
            }
            result += sign * num;
            return result;
        }</code></pre>

        <p><strong>Time Complexity:</strong> O(n) - where n is the length of the string.</p>
        <p><strong>Space Complexity:</strong> O(d) - where d is the maximum depth of nested parentheses.</p>
    `
  },
  {
    "question": "Merge Two Sorted Arrays",
    "description": "Write a function that merges two sorted arrays into a single sorted array.",
    "hint": "Use a two-pointer approach, comparing elements from both arrays and placing the smaller one into the merged array.",
    "answer": `
        <p><strong>Solution Approach (Two Pointers):</strong></p>
        <p>Create a new empty array to store the merged result. Initialize two pointers, one for each input array, starting at the beginning. Compare the elements at the pointers. Add the smaller element to the result array and move the corresponding pointer forward. Continue this process until one of the arrays is exhausted. Then, append any remaining elements from the other array to the result.</p>

        <pre><code>function mergeSortedArrays(arr1, arr2) {
            const merged = [];
            let i = 0;
            let j = 0;
            while (i < arr1.length && j < arr2.length) {
                if (arr1[i] <= arr2[j]) {
                    merged.push(arr1[i]);
                    i++;
                } else {
                    merged.push(arr2[j]);
                    j++;
                }
            }
            while (i < arr1.length) {
                merged.push(arr1[i]);
                i++;
            }
            while (j < arr2.length) {
                merged.push(arr2[j]);
                j++;
            }
            return merged;
        }</code></pre>

        <p><strong>Time Complexity:</strong> O(m + n) - where m and n are the lengths of the two input arrays.</p>
        <p><strong>Space Complexity:</strong> O(m + n) - for the new merged array.</p>
    `
  },
  {
    "question": "Find the First Non-Repeating Character in a String",
    "description": "Write a function that finds the first non-repeating character in a given string.",
    "hint": "Use a hash map to count the frequency of each character. Then, iterate through the string again to find the first character with a frequency of 1.",
    "answer": `
        <p><strong>Solution Approach:</strong></p>
        <p>First, iterate through the string and store the frequency of each character in a hash map. Then, iterate through the string again in the original order. The first character found in the hash map with a frequency of 1 is the answer.</p>

        <pre><code>function findFirstNonRepeatingCharacter(str) {
            const charCounts = {};
            for (const char of str) {
                charCounts[char] = (charCounts[char] || 0) + 1;
            }
            for (const char of str) {
                if (charCounts[char] === 1) {
                    return char;
                }
            }
            return null; // If no non-repeating character is found
        }</code></pre>

        <p><strong>Time Complexity:</strong> O(n) - where n is the length of the string (two passes).</p>
        <p><strong>Space Complexity:</strong> O(k) - where k is the number of unique characters in the string (for the hash map).</p>
    `
  },
  {
    "question": "Find the Missing Number",
    "description": "Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.",
    "hint": "Consider using the sum of numbers or bitwise XOR.",
    "answer": `
        <p><strong>Solution Approach (Sum of Numbers):</strong></p>
        <p>The sum of numbers from 0 to n is n*(n+1)/2. Calculate the sum of the elements in the given array. The missing number is the difference between the expected sum and the actual sum.</p>

        <pre><code>function findMissingNumber(nums) {
            const n = nums.length;
            const expectedSum = n * (n + 1) / 2;
            let actualSum = 0;
            for (const num of nums) {
                actualSum += num;
            }
            return expectedSum - actualSum;
        }</code></pre>

        <p><strong>Time Complexity:</strong> O(n) - one pass through the array.</p>
        <p><strong>Space Complexity:</strong> O(1) - constant extra space.</p>
    `
  },
  {
    "question": "Reverse Words in a String",
    "description": "Given a string s, reverse the order of words. For example, \"the sky is blue\" should become \"blue is sky\".",
    "hint": "Split the string by spaces, reverse the array of words, and then join them back with spaces.",
    "answer": `
        <p><strong>Solution Approach:</strong></p>
        <p>Split the input string into an array of words using spaces as delimiters. Reverse the order of elements in this array. Finally, join the reversed array of words back into a string with spaces.</p>

        <pre><code>function reverseWords(s) {
            return s.split(' ').reverse().join(' ');
        }</code></pre>

        <p><strong>Time Complexity:</strong> O(n) - where n is the length of the string (due to split, reverse, and join operations).</p>
        <p><strong>Space Complexity:</strong> O(n) - to store the array of words.</p>
    `
  },
  {
    "question": "Rotate Array",
    "description": "Given an array nums and an integer k, rotate the array to the right by k steps.",
    "hint": "Consider using extra space or performing in-place reversal of segments.",
    "answer": `
        <p><strong>Solution Approach (In-place Reversal):</strong></p>
        <p>Reverse the entire array. Then, reverse the first k elements. Finally, reverse the remaining elements from index k to the end.</p>

        <pre><code>function rotateArray(nums, k) {
            const n = nums.length;
            k = k % n; // Handle cases where k > n

            function reverse(arr, start, end) {
                while (start < end) {
                    [arr[start], arr[end]] = [arr[end], arr[start]];
                    start++;
                    end--;
                }
            }

            reverse(nums, 0, n - 1);
            reverse(nums, 0, k - 1);
            reverse(nums, k, n - 1);
            return nums;
        }</code></pre>

        <p><strong>Time Complexity:</strong> O(n) - three reversals of the array.</p>
        <p><strong>Space Complexity:</strong> O(1) - in-place operations.</p>
    `
  },
  {
    "question": "Check if a Number is a Power of Two",
    "description": "Given an integer n, return true if it is a power of two. Otherwise, return false.",
    "hint": "Consider bitwise operations. A power of two has only one bit set to 1 in its binary representation.",
    "answer": `
        <p><strong>Solution Approach (Bitwise AND):</strong></p>
        <p>A power of two (greater than 0) has the property that n & (n - 1) == 0. For example, 8 (1000) & 7 (0111) == 0. Handle the case where n is 0 separately.</p>

        <pre><code>function isPowerOfTwo(n) {
            if (n <= 0) {
                return false;
            }
            return (n & (n - 1)) === 0;
        }</code></pre>

        <p><strong>Time Complexity:</strong> O(1) - constant time for bitwise operations.</p>
        <p><strong>Space Complexity:</strong> O(1) - constant extra space.</p>
    `
  },
  {
    "question": "Reverse a Linked List",
    "description": "Given the head of a singly linked list, reverse the list.",
    "hint": "Iterate through the list and change the `next` pointer of each node to point to the previous node.",
    "answer": `
        <p><strong>Solution Approach (Iterative):</strong></p>
        <p>Maintain three pointers: <code>prev</code>, <code>current</code>, and <code>next</code>.  Iterate through the list.  For each node, change its <code>next</code> pointer to <code>prev</code>, and then advance the pointers.</p>

        <pre><code>function reverseList(head) {
            let prev = null;
            let current = head;
            while (current) {
                const next = current.next;
                current.next = prev;
                prev = current;
                current = next;
            }
            return prev;
        }</code></pre>

        <p><strong>Time Complexity:</strong> O(n) - where n is the number of nodes in the list.</p>
        <p><strong>Space Complexity:</strong> O(1) - constant extra space.</p>
    `
  },
  {
    "question": "Valid Parentheses",
    "description": "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    "hint": "Use a stack to keep track of opening brackets. When a closing bracket is encountered, check if it matches the top of the stack.",
    "answer": `
        <p><strong>Solution Approach (Stack):</strong></p>
        <p>Iterate through the string.  Push opening brackets onto a stack.  When a closing bracket is encountered, pop from the stack and check if it matches.  The string is valid if the stack is empty at the end.</p>

        <pre><code>function isValid(s) {
            const stack = [];
            const map = {
                ')': '(',
                '}': '{',
                ']': '['
            };
            for (let i = 0; i < s.length; i++) {
                const char = s[i];
                if (map[char]) { // Closing bracket
                    const topElement = stack.pop() || '#';  // Use '#' for empty stack
                    if (topElement !== map[char]) {
                        return false;
                    }
                } else { // Opening bracket
                    stack.push(char);
                }
            }
            return stack.length === 0;
        }</code></pre>

        <p><strong>Time Complexity:</strong> O(n) - where n is the length of the string.</p>
        <p><strong>Space Complexity:</strong> O(n) - in the worst case, the stack can contain all opening brackets.</p>
    `
  },
  {
    "question": "Implement Queue using Stacks",
    "description": "Implement a first in first out (FIFO) queue using only two stacks.",
    "hint": "One stack for enqueue, another for dequeue. Transfer elements when dequeue stack is empty.",
    "answer": `
        <p><strong>Solution Approach (Two Stacks):</strong></p>
        <p>Use <code>stack1</code> for enqueue (push). Use <code>stack2</code> for dequeue (pop). If <code>stack2</code> is empty, transfer all elements from <code>stack1</code> to <code>stack2</code>, reversing their order.</p>

        <pre><code>class MyQueue {
            constructor() {
                this.stack1 = [];
                this.stack2 = [];
            }

            push(x) {
                this.stack1.push(x);
            }

            pop() {
                if (this.stack2.length === 0) {
                    while (this.stack1.length > 0) {
                        this.stack2.push(this.stack1.pop());
                    }
                }
                return this.stack2.pop();
            }

            peek() {
                if (this.stack2.length === 0) {
                    while (this.stack1.length > 0) {
                        this.stack2.push(this.stack1.pop());
                    }
                }
                return this.stack2[this.stack2.length - 1];
            }

            empty() {
                return this.stack1.length === 0 && this.stack2.length === 0;
            }
        }</code></pre>

        <p><strong>Time Complexity:</strong> Amortized O(1) for all operations.</p>
        <p><strong>Space Complexity:</strong> O(n) - where n is the number of elements in the queue.</p>
    `
  }
    ];

    fasalQuestions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question-item');

        const title = document.createElement('h3');
        title.textContent = `${index + 1}. ${question.question}`;

        const description = document.createElement('p');
        description.textContent = question.description;

        // Create button container
        const buttonContainer = document.createElement('div');
        buttonContainer.style.display = 'flex';
        buttonContainer.style.gap = '10px';
        buttonContainer.style.marginTop = '15px';

        // Hint Button
        const hintButton = document.createElement('button');
        hintButton.textContent = 'Show Hint';
        hintButton.style.padding = '10px 20px';
        hintButton.style.border = 'none';
        hintButton.style.borderRadius = '5px';
        hintButton.style.backgroundColor = '#4CAF50';
        hintButton.style.color = 'white';
        hintButton.style.fontWeight = 'bold';
        hintButton.style.cursor = 'pointer';
        hintButton.style.transition = 'all 0.3s ease';
        hintButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        
        // Hover effect for hint button
        hintButton.addEventListener('mouseover', () => {
            hintButton.style.backgroundColor = '#45a049';
            hintButton.style.transform = 'translateY(-2px)';
            hintButton.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        });
        
        hintButton.addEventListener('mouseout', () => {
            hintButton.style.backgroundColor = '#4CAF50';
            hintButton.style.transform = 'translateY(0)';
            hintButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        });
        
        hintButton.addEventListener('click', () => {
            hintQuestionTitle.textContent = question.question;
            hintContentDiv.innerHTML = `<p>${question.hint}</p>`;
            hintModal.style.display = 'block';
        });

        // Answer Button
        const answerButton = document.createElement('button');
        answerButton.textContent = 'Show Answer';
        answerButton.style.padding = '10px 20px';
        answerButton.style.border = 'none';
        answerButton.style.borderRadius = '5px';
        answerButton.style.backgroundColor = '#2196F3';
        answerButton.style.color = 'white';
        answerButton.style.fontWeight = 'bold';
        answerButton.style.cursor = 'pointer';
        answerButton.style.transition = 'all 0.3s ease';
        answerButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        
        // Hover effect for answer button
        answerButton.addEventListener('mouseover', () => {
            answerButton.style.backgroundColor = '#0b7dda';
            answerButton.style.transform = 'translateY(-2px)';
            answerButton.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        });
        
        answerButton.addEventListener('mouseout', () => {
            answerButton.style.backgroundColor = '#2196F3';
            answerButton.style.transform = 'translateY(0)';
            answerButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        });
        
        answerButton.addEventListener('click', () => {
            hintQuestionTitle.textContent = question.question;
            hintContentDiv.innerHTML = question.answer;
            hintModal.style.display = 'block';
        });

        // Add buttons to container
        buttonContainer.appendChild(hintButton);
        buttonContainer.appendChild(answerButton);

        questionDiv.appendChild(title);
        questionDiv.appendChild(description);
        questionDiv.appendChild(buttonContainer);
        questionsListDiv.appendChild(questionDiv);
    });

    closeBtn.addEventListener('click', () => {
        hintModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === hintModal) {
            hintModal.style.display = 'none';
        }
    });
});