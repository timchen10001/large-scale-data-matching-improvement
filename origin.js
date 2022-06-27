const timeRangeAnchors = require("./anchors.json");
const bytesIn = require("./BYTES_IN.json");
const bytesOut = require("./BYTES_OUT.json");
const moment = require('moment');

function getNextTimeEndAnchorIndex(nowCursor, target) {
  if (timeRangeAnchors[nowCursor][1] >= target) return nowCursor;
  return getNextTimeEndAnchorIndex(nowCursor + 1, target);
}

function solution(rows) {
    return rows.reduce(
        ({ results, cursor }, row) => {
          const numTime = Number(row.timestamp);
          const anchor = getNextTimeEndAnchorIndex(cursor, numTime);
          const startFrom = moment(timeRangeAnchors[anchor][0]).toISOString();
          return {
            results: {
              ...results,
              [startFrom]: (results[startFrom] || 0) + row.value,
            },
            cursor: anchor,
          };
        },
        {
          results: {},
          cursor: 0,
        }
      ).results;
}

let result;
console.time('IN');
result = solution(bytesIn);
console.timeEnd('IN');
// console.log(result);
console.time('OUT');
result = solution(bytesOut);
console.timeEnd('OUT');
console.log('correction is', result[moment(1656292200000).toISOString()] === 1159685369428);
console.log(Object.keys(result).length);
// console.log(result);