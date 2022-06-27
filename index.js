const anchors = require('./anchors.json');
const bytesIn = require('./BYTES_IN.json');
const bytesOut = require('./BYTES_OUT.json');

// dto
/**
 * ```typescript
 * type Anchor = [number, number]; // start and from
 * type Byte = { timestamp: string, value: number };
 * ```
 */

function solution(bytes) {
    const ans = {};
    
    anchors.forEach(anchor => {
        const from = anchor[0];
        const to = anchor[1];
        const criticalIndex = binarySearch(bytes, to);
        const currentSum = accumulateSum(bytes, criticalIndex);
        if (currentSum > 0) ans[from] = currentSum;
    })

    return ans;
}

function binarySearch(bytes, target) {
    let left = 0;
    let right = anchors.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (!bytes[mid]) break;

        const currentTimeStamp = Number(bytes[mid].timestamp);

        if (currentTimeStamp === target) return mid;

        if (currentTimeStamp < target) {
            left = mid + 1;
        } else if (currentTimeStamp > target) {
            right = mid - 1;
        }
    }

    if (bytes[left] && Number(bytes[left].timestamp) <= target) return left;
    if (bytes[right] && Number(bytes[right].timestamp) <= target) return right;

    return -1;
}

function accumulateSum(bytes, index) {
  let sum = 0;

  for (let i = 0; i <= index; i++) {
    sum += bytes.shift().value;
  }

  return sum;
}

let result;
console.time('IN');
result = solution(bytesIn);
console.timeEnd('IN');
// console.log(result);
console.time('OUT');
result = solution(bytesOut);
console.timeEnd('OUT');
// console.log(result);