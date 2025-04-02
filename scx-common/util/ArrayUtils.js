/**
 * 拷贝数组 (浅拷贝)
 * @param list
 * @returns {*[]}
 */
function copyArray(list) {
    return [...list];
}

/**
 * 根据 索引 从数组中移除 项
 * @param list
 * @param index
 */
function removeByIndex(list, index) {
    list.splice(index, 1);
}

/**
 * 内部用 所以不进行 index 是否越界的校验
 * @param list a
 * @param oldIndex a
 * @param newIndex a
 */
function moveItemByIndex(list, oldIndex, newIndex) {
    //经过计算 后有可能导致 索引没变化 这时就不需要在移动一次了
    if (oldIndex !== newIndex) {
        //保存临时数据
        const oldItem = list[oldIndex];
        //从原数组中移除数据
        list.splice(oldIndex, 1);
        //在指定位置插入新数据
        list.splice(newIndex, 0, oldItem);
    }
}

/**
 * 根据 索引 从数组中上移 项
 * @param list 列表
 * @param index 索引
 * @param loop 是否采用循环
 * @param step 步长
 */
function moveUpByIndex(list, index, loop = false, step = 1) {
    let minIndex = 0;
    let nextIndex = index - step;
    if (nextIndex < minIndex) {
        nextIndex = loop ? nextIndex % list.length + list.length : minIndex;
    }
    moveItemByIndex(list, index, nextIndex);
}

/**
 * 根据 索引 从数组中下移 项
 * @param list 列表
 * @param index 索引
 * @param loop 是否采用循环
 * @param step 步长
 */
function moveDownByIndex(list, index, loop = false, step = 1) {
    let maxIndex = list.length - 1;
    let nextIndex = index + step;
    if (nextIndex > maxIndex) {
        nextIndex = loop ? nextIndex % list.length : maxIndex;
    }
    moveItemByIndex(list, index, nextIndex);
}

/**
 * 根据 项 从数组中移除 项
 * @param list
 * @param item
 */
function removeByItem(list, item) {
    let indexOf = list.indexOf(item);
    if (indexOf !== -1) {
        removeByIndex(list, indexOf);
    }
}

/**
 * 根据 项 从数组中上移 项
 * @param list 列表
 * @param item 项
 * @param loop 是否采用循环
 * @param step 步长
 */
function moveUpByItem(list, item, loop = false, step = 1) {
    let indexOf = list.indexOf(item);
    if (indexOf !== -1) {
        moveUpByIndex(list, indexOf, loop, step);
    }
}

/**
 * 根据 项 从数组中下移 项
 * @param list 列表
 * @param item 项
 * @param loop 是否采用循环
 * @param step 步长
 */
function moveDownByItem(list, item, loop = false, step = 1) {
    let indexOf = list.indexOf(item);
    if (indexOf !== -1) {
        moveDownByIndex(list, indexOf, loop, step);
    }
}

/**
 * 在指定位置插入数据
 * @param list 列表
 * @param index 插入索引
 * @param items 项
 */
function insertItem(list, index, ...items) {
    if (index < 0) {
        list.unshift(...items);
    } else if (index > list.length) {
        list.push(...items);
    } else {
        list.splice(index, 0, ...items);
    }
}

function arrayEquals(array1, array2) {
    if (array1.length !== array2.length) {
        return false;
    }
    for (let i = 0; i < array1.length; i++) {
        if (array1[i] !== array2[i]) {
            return false;
        }
    }
    return true;
}

/**
 * 根据 项 从数组中移除所有匹配的项
 * @param list
 * @param item
 */
function removeAllByItem(list, item) {
    for (let i = list.length - 1; i >= 0; i--) {
        if (list[i] === item) {
            removeByIndex(list, i);
        }
    }
}

/**
 * 直接去重原数组 - 使用临时列表记录已出现过的元素
 * @param list
 */
function uniqueArray(list) {
    let seen = new Set();  // 临时存储已出现的元素
    let index = 0;  // 用于遍历数组

    while (index < list.length) {
        let item = list[index];
        if (seen.has(item)) {
            // 如果元素已经出现过，移除当前元素
            list.splice(index, 1);
        } else {
            // 否则，记录该元素，并继续遍历
            seen.add(item);
            index++;
        }
    }
}

export {
    copyArray,
    removeByIndex,
    moveUpByIndex,
    moveDownByIndex,
    removeByItem,
    moveUpByItem,
    moveDownByItem,
    insertItem,
    arrayEquals,
    removeAllByItem,
};
