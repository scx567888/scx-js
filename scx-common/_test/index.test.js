import {
    arrayEquals,
    copyArray,
    insertItem,
    moveDownByIndex,
    moveDownByItem,
    moveUpByIndex,
    moveUpByItem,
    removeByIndex,
    removeByItem,
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

// Test arrayEquals
assert(arrayEquals([1, 2, 3], [1, 2, 3]), "arrayEquals should return true for equal arrays");
assert(!arrayEquals([1, 2, 3], [1, 2, 4]), "arrayEquals should return false for different arrays");

console.log("\nAll tests completed.");
