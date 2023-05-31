import {BinaryHeapComparator} from './types';

/**
 * Implementation of the Binary Heap data structure
 * https://en.wikipedia.org/wiki/Binary_heap
 */
export class BinaryHeap<Value> {
	protected comparator: BinaryHeapComparator<Value>;

	protected items: Value[] = [];

	constructor(comparator: BinaryHeapComparator<Value>) {
		this.comparator = comparator;
	}

	/**
	 * @returns {number} the number of items in the heap.
	 */
	get size() {
		return this.items.length;
	}

	/**
	 * @returns {boolean} true if the heap is empty, false otherwise.
	 */
	get isEmpty() {
		return this.size === 0;
	}

	/**
	 * 
	 * @param index 
	 * @returns 
	 */
	private getParentIndex(index: number): number {
		return index > 0 ? Math.floor((index - 1) / 2) : -1;
	}

	/**
	 * 
	 * @param index 
	 * @returns 
	 */
	private getLeftChildIndex(index: number): number {
		return 2 * index + 1;
	}

	/**
	 * 
	 * @param index 
	 * @returns 
	 */
	private getRightChildIndex(index: number): number {
		return 2 * index + 2;
	}

	/**
	 * 
	 * @param a 
	 * @param b 
	 */
	private swap(a: number, b: number) {
		const tmp = this.items[a];
		this.items[a] = this.items[b];
		this.items[b] = tmp;
	}

	/**
	 * 
	 */
	replace(value: Value) {
		this.items[0] = value;
		this.siftDown();
	}

	/**
	 * Find a maximum item of a max-heap, or a minimum 
	 * item of a min-heap, respectively.
	 * @returns {null | Value}
	 */
	peek(): Value | null {
		if (this.isEmpty) {
			return null;
		}

		return this.items[0];
	}

	/**
	 * Adding a new key to the heap.
	 * @param {Value} value 
	 */
	push(value: Value): void {
		this.items.push(value);
		this.siftUp();
	}

	/**
	 * Returns the node of maximum value from a max heap 
	 * [or minimum value from a min heap] after removing it from the heap.
	 * @returns {Value | null}
	 */
	poll(): Value | null {
		const result = this.items[0]
		this.items[0] = this.items.pop();

		if (this.comparator(result, this.items[0])) {
			this.siftDown();
		} else {
			this.siftUp();
		}

		return result;
	}

	/**
	 * Move a node up in the tree, as long as needed; 
	 * used to restore heap condition after insertion. 
	 * Called "sift" because node moves up the tree 
	 * until it reaches the correct level, as in a sieve.
	 */
	siftUp(from: number = this.items.length - 1) {
		if (this.isEmpty || !(from in this.items)) return;

		const parentIndex = this.getParentIndex(from);
		if (parentIndex !== -1) {
			const currItem = this.items[from];
			const parentItem = this.items[parentIndex];

			if (this.comparator(parentItem, currItem)) {
				this.swap(parentIndex, from);
				this.siftUp(parentIndex);
			}
		}
	}

	/**
	 * Move a node down in the tree, similar to sift-up; 
	 * used to restore heap condition after deletion or replacement.
	 */
	siftDown(from: number = 0) {
		if (this.isEmpty || !(from in this.items)) return;

		const leftChildIndex = this.getLeftChildIndex(from);
		const rightChildIndex = this.getRightChildIndex(from);

		if (leftChildIndex in this.items) {
			const leftChild = this.items[leftChildIndex];
			const currItem = this.items[from];

			if (rightChildIndex in this.items) {
				const rightChild = this.items[rightChildIndex];

				if (this.comparator(rightChild, leftChild)) {
					if (this.comparator(rightChild, currItem)) {
						this.swap(rightChildIndex, from);
						this.siftDown(rightChildIndex);
						return;
					}
				}
			}

			if (this.comparator(leftChild, currItem)) {
				this.swap(leftChildIndex, from);
				this.siftDown(leftChildIndex);
			}
		}
	}
}
