// The node will have data, left and right
class Node{
    constructor(data, left = null, right = null){
        this.data =  data;
        this.left = left;
        this.right = right;
    }
}

class Tree{
    constructor(arr = []){
        this.root = null
        arr.forEach(value => this.insert(value))
    }

    insert(value) {
        const node = this.root;
        if(!node){
            this.root = new Node(value);
            return;
        } else {
            const searchTree = (node) => {
                if(value < node.data){
                    if(!node.left){
                        node.left = new Node(value)
                    } else if (node.left){
                        return searchTree(node.left)
                    }
                }else if (value > node.data){
                    if(!node.right){
                        node.right = new Node(value)
                    } else if (node.right){
                        return searchTree(node.right)
                    }
                } else {
                    return null
                }
            };
            return searchTree(node)
        }
    }

    deleteItem(value) {
        const deleteNode = (node, value) => {
            if (!node) {
                return null
            } 
            if(value == node.data){
                //checking each instance.
                // IF node has no child
                if (!node.right && !node.left){
                    return null
                }
                // node has no left child
                if(!node.left){
                    return node.right
                }
                // has no right child
                if(!node.right) {
                    return node.left
                }
                // node has two children
                var temporaryNode = node.right;
                while(temporaryNode.left){
                    temporaryNode = temporaryNode.left
                }
                node.data = temporaryNode.data
                node.right = deleteNode(node.right, temporaryNode.data)
                return node;
            } else if (value < node.data){
                node.left = deleteNode(node.left, value)
                return node;
            } else {
                node.right = deleteNode(node.right, value)
                return node;
            }
        }
        this.root = deleteNode(this.root, value)
    }

    find(value){
        let current = this.root;
        while(current){
            if (value === current.data) return current
            // iff value is lower than the current node, go left, else, go right, repetetivily.
            current = value < current.data ? current.left : current.right
        }
        return null // not in tree
    }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if(node === null){
        return;
    }
    if(node.right !== null){
        prettyPrint(node.right, `${prefix}${isLeft ? "|   " : "    " }`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`)
    if(node.left !== null){
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
}


const arrayTree = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
const binarySearchTree = new Tree(arrayTree)

console.log(binarySearchTree)
console.log(binarySearchTree.find(67))