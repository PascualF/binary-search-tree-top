// Class to create a new Node
class Node {
    constructor(data, left = null, right = null){
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class Tree {
    constructor(arr = []){
        if(!Array.isArray(arr)){
            throw new TypeError("Expected an array to build the tree")
        }

        arr = [...new Set(arr)].sort((x, y) => x - y) // This removes duplicates and sorts the array
        this.root = this.buildTree(arr) // Gives the root node to the root
    }


    buildTree(arr){
        if (!arr.length) return null; // Base case: Empty array

        const midIndex = Math.floor(arr.length / 2)
        const node = new Node(arr[midIndex])

        node.left = this.buildTree(arr.slice(0, midIndex)) // Recursive the left half
        node.right = this.buildTree(arr.slice(midIndex + 1)) // Recursive the right half

        return node;
    }

        
    // This balance function will take the arrya from inOrder and 
    balance(){
        let result = []
        this.inOrder(node => result.push(node.data))
        this.root = this.buildTree(result)
    }

    rootValue(){
        console.log(this.root.data)
    }

    insert(value){
        if(!this.root){
            this.root = new Node(value);
            return; // Stop execution here
        }

        let current = this.root;

        while(current){
            if(value === current.data) return undefined; // No duplicates

            if(value < current.data){
                if(current.left === null){
                    current.left = new Node(value) // Create node in right location
                    return;
                }
                current = current.left
            } else if ( value > current.data) {
                if(current.right === null){
                    current.right = new Node(value)
                    return
                }
                current = current.right
            }
        }

        this.balance()
        return;

    }

    deleteItem(value){
        // It needs to be recursive, since we will 'travel' through
        const removeNode = (node, value) => {
            // Tree empty, so nothing to delete
            if(node === null) return null;
    
            // From here we will search for the node to delete
            if(value < node.data){
                node.left = removeNode(node.left, value); // Recursive on the left side
                return node
            } else if (value > node.data) {
                node.right = removeNode(node.right, value); // Recursive on the right side
                return node
            } else { // In this case the node was found.

                // Case 1: No has no children, best case
                if(!node.left && !node.right){
                    return null
                }

                // Case 2: Node has only one child
                if(node.left === null) return node.right
                if(node.right === null) return node.left

                // Case 3: Node has 2 children, most complicated.
                let tempNode = node.right;

                while(tempNode.left){
                    tempNode = tempNode.left
                }

                node.data = tempNode.data; // Replace with inorder successor
                node.right = removeNode(node.right, tempNode.data) 
                // This will recurse and modify the tree until deleting the value
                return node
            }
        }

        this.root = removeNode(this.root, value) // This will start the recursion.
    }

    find(value) {
        if(!this.root) return null;

        let current = this.root;

        while(current) {
            if(value === current.data) return current;
            if(value < current.data){
                if(current.left === null){
                    return null
                }
                current = current.left
            } else if (value > current.data){
                if(current.right === null){
                    return null
                }
                current = current.right
            }
        }
        return;
    }


    // Check this one better to understand what you did.
    levelOrder(callback){
        if(!callback || typeof callback !== "function"){
            throw new Error('A callback function is required')
        }

        // If tree empty, just return nothing.
        if(!this.root) return;

        // An array should be created, to sequence the nodes
        const sequence = [this.root]

        while (sequence.length > 0){
            // Remove the frist node from the queue
            const currentNode = sequence.shift()

            // Process the current node using the callback
            callback(currentNode);

            // Add the children to the sequence (if they exist)
            if(currentNode.left) sequence.push(currentNode.left);
            if(currentNode.right) sequence.push(currentNode.right);

        }

    }
    
    // Give an array, that send to the buildTree.
    // To achieve this, I need ti process the left node first, than the root node, than the right.
    inOrder(callback){

        if(typeof callback !== 'function'){
            throw new Error('A callback function is required!')            
        }

        const traverse = node => {
            // Base case, when null reference
            if(!node) return;

            // Recursively traverse the left subtree
            if(node.left) traverse(node.left)

            // Process current node
            callback(node)

            if(node.right) traverse(node.right)

        }

        traverse(this.root) // Starts from the root
    }

    preOrder(callback){

        if(typeof callback !== 'function'){
            throw new Error('A callback function is required!')            
        }

        const traverse = node => {
            // Base case, when null reference
            if(!node) return;

            // Process current node
            callback(node)

            // Recursively traverse the left subtree
            if(node.left) traverse(node.left)

           
            if(node.right) traverse(node.right)

        }

        traverse(this.root) // Starts from the root
    }

    postOrder(callback){

        if(typeof callback !== 'function'){
            throw new Error('A callback function is required!')            
        }

        const traverse = node => {
            // Base case, when null reference
            if(!node) return;

            // Recursively traverse the left subtree
            if(node.left) traverse(node.left)


            if(node.right) traverse(node.right)

            // Process current node
            callback(node)
        }

        traverse(this.root) // Starts from the root
    }

    // Give back the height of a given node
    height(node = this.root){
        // Recursing through each node
        

    }

    // Give back depth of a given node
    depth(node){

    }

    // This function checks if the tree is balanced, no more then 1 height difference.
    isBalanced(){
        return Math.abs(this.maxHeight() - this.minHeight()) <= 1; 
        // The min height - the max height needs to be 1 maximum
    }

    minHeight(node = this.root){
        // Passing the root as the node I work on

        // If no node is present; left or right side, than it will be equal -1
        if(!node) return -1

        let leftSide = this.minHeight(node.left);
        let rightSide = this.minHeight(node.right);

        if( leftSide > rightSide){
            return leftSide + 1
        } else {
            return rightSide + 1
        }
    }

    maxHeight(node = this.root){
        if(!node) return -1

        let leftSide = this.minHeight(node.left);
        let rightSide = this.minHeight(node.right);

        if(leftSide < rightSide){
            return leftSide + 1
        } else {
            return rightSide + 1
        }
    }


}

const tree = new Tree()

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) return;
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

for(let i = 1; i < 20; i++){
    let n = Math.floor(Math.random() * 1000)
    tree.insert(n)
}
tree.balance()
tree.deleteItem(449)

tree.height(50)
console.log(tree.minHeight())
console.log(tree.maxHeight())
console.log(tree.isBalanced())
/* 
tree.postOrder(node => console.log(node.data))
tree.preOrder(node => console.log(node.data)) */
prettyPrint(tree.root)
