export class BinaryTreeNode<Value> {
	public value: Value;
	public left: BinaryTreeNode<Value> | null = null;
	public right: BinaryTreeNode<Value> | null = null;

	constructor(value: Value) {
		this.value = value;
		this.left = null;
		this.right = null;
	}
}
