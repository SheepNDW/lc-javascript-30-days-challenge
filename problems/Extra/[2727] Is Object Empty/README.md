# 2727. Is Object Empty

###### tags: `Easy`

[2727. Is Object Empty](https://leetcode.com/problems/is-object-empty/)

### 題目描述

Given an object or an array, return if it is empty.

- An empty object contains no key-value pairs.
- An empty array contains no elements.

You may assume the object or array is the output of `JSON.parse`.

### 範例

**Example 1:**

```text
Input: obj = {"x": 5, "y": 42}
Output: false
Explanation: The object has 2 key-value pairs so it is not empty.
```

**Example 2:**

```text
Input: obj = {}
Output: true
Explanation: The object doesn't have any key-value pairs so it is empty.
```

**Example 3:**

```text
Input: obj = [null, false, 0]
Output: false
Explanation: The array has 3 elements so it is not empty.
```

**Constraints**:

- 2 <= `JSON.stringify(obj).length` <= 10<sup>5</sup>
