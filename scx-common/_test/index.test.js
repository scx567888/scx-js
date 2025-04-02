import {
    arrayEquals,
    copyArray,
    insertItem,
    moveDownByIndex,
    moveDownByItem,
    moveUpByIndex,
    moveUpByItem,
    removeAllByItem,
    removeByIndex,
    removeByItem,
    uniqueArray,
} from "../index.js"; // 请确保你的工具类文件名匹配

function assert(condition, message) {
    console.log(condition ? "✔ PASS" : `✘ FAIL: ${message}`);
}

console.log("Testing Array Utility Functions\n");

// Test copyArray
let arr = [1, 2, 3];
let copy = copyArray(arr);
assert(JSON.stringify(copy) === JSON.stringify(arr), "copyArray should return a shallow copy");
assert(copy !== arr, "copyArray should return a new array");

// Test removeByIndex
arr = [1, 2, 3, 4];
removeByIndex(arr, 1);
assert(JSON.stringify(arr) === JSON.stringify([1, 3, 4]), "removeByIndex should remove item at index");

// Test moveItemByIndex (moveUpByIndex and moveDownByIndex)
arr = ["a", "b", "c", "d"];
moveUpByIndex(arr, 2);
assert(JSON.stringify(arr) === JSON.stringify(["a", "c", "b", "d"]), "moveUpByIndex should move item up");
moveDownByIndex(arr, 1);
assert(JSON.stringify(arr) === JSON.stringify(["a", "b", "c", "d"]), "moveDownByIndex should move item down");

// Test removeByItem
arr = ["x", "y", "z"];
removeByItem(arr, "y");
assert(JSON.stringify(arr) === JSON.stringify(["x", "z"]), "removeByItem should remove specific item");

// Test removeByItem when item is not in list
arr = ["a", "b", "c"];
removeByItem(arr, "d");
assert(JSON.stringify(arr) === JSON.stringify(["a", "b", "c"]), "removeByItem should not modify array if item is not present");

// Test moveUpByItem
arr = ["apple", "banana", "cherry"];
moveUpByItem(arr, "cherry");
assert(JSON.stringify(arr) === JSON.stringify(["apple", "cherry", "banana"]), "moveUpByItem should move item up");

// Test moveDownByItem
arr = ["apple", "banana", "cherry"];
moveDownByItem(arr, "apple");
assert(JSON.stringify(arr) === JSON.stringify(["banana", "apple", "cherry"]), "moveDownByItem should move item down");

// Test insertItem
arr = [1, 2, 3];
insertItem(arr, 1, 9, 8);
assert(JSON.stringify(arr) === JSON.stringify([1, 9, 8, 2, 3]), "insertItem should insert items at index");

// Test insertItem at beginning
arr = [1, 2, 3];
insertItem(arr, 0, 0);
assert(JSON.stringify(arr) === JSON.stringify([0, 1, 2, 3]), "insertItem should insert at beginning");

// Test insertItem at end
arr = [1, 2, 3];
insertItem(arr, 10, 4);
assert(JSON.stringify(arr) === JSON.stringify([1, 2, 3, 4]), "insertItem should insert at end if index is out of range");

// Test arrayEquals
assert(arrayEquals([1, 2, 3], [1, 2, 3]), "arrayEquals should return true for equal arrays");
assert(!arrayEquals([1, 2, 3], [1, 2, 4]), "arrayEquals should return false for different arrays");

// Test removeAllByItem - Remove all occurrences
arr = [1, 2, 3, 2, 4, 2, 5];
removeAllByItem(arr, 2);
assert(JSON.stringify(arr) === JSON.stringify([1, 3, 4, 5]), "removeAllByItem should remove all occurrences of item");

// Test removeAllByItem - Item not found
arr = [1, 2, 3, 4, 5];
removeAllByItem(arr, 6);
assert(JSON.stringify(arr) === JSON.stringify([1, 2, 3, 4, 5]), "removeAllByItem should not modify array if item is not present");

// Test removeAllByItem - Removing all elements
arr = [7, 7, 7, 7, 7];
removeAllByItem(arr, 7);
assert(JSON.stringify(arr) === JSON.stringify([]), "removeAllByItem should remove all elements if all match");

// Test removeAllByItem - Mixed types
arr = ["a", "b", "a", "c", "a"];
removeAllByItem(arr, "a");
assert(JSON.stringify(arr) === JSON.stringify(["b", "c"]), "removeAllByItem should work with string elements");

// Test uniqueArray - Remove duplicates
arr = [1, 2, 2, 3, 3, 3, 4];
uniqueArray(arr);
assert(JSON.stringify(arr) === JSON.stringify([1, 2, 3, 4]), "uniqueArray should remove duplicate items");

// Test uniqueArray - No duplicates
arr = [1, 2, 3, 4];
uniqueArray(arr);
assert(JSON.stringify(arr) === JSON.stringify([1, 2, 3, 4]), "uniqueArray should not modify array if no duplicates");

// Test uniqueArray - All duplicates
arr = [5, 5, 5, 5];
uniqueArray(arr);
assert(JSON.stringify(arr) === JSON.stringify([5]), "uniqueArray should handle all duplicates correctly");

console.log("\nAll tests completed.");
