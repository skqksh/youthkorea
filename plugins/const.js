import Vue from 'vue'

const CONST = {
  PRODUCTION: "production",
  DEVELOPMENT: "development",
  CATEGORY: {
    ORG_GREETING: "orggreeting", //인사말
    ORG_HISTORY: "orghistory", //연혁
    ORG_CHART: "orgchart", //조직도

  },
  sortFunc: function (a, b, sortBy, isDesc) {
    var A = a[sortBy] // ignore upper and lowercase
    var B = b[sortBy] // ignore upper and lowercase
    if (A < B) {
      return isDesc ? -1 : 1
    }
    if (A > B) {
      return isDesc ? 1 : -1
    }
    // 이름이 같을 경우
    return 0
  },
  unflatten: function (arr) {
    var tree = [],
      mappedArr = {},
      arrElem,
      mappedElem;

    // First map the nodes of the array to an object -> create a hash table.
    for (var i = 0, len = arr.length; i < len; i++) {
      arrElem = arr[i];
      mappedArr[arrElem.id] = arrElem;
      mappedArr[arrElem.id]['children'] = [];

    }

    for (var id in mappedArr) {
      if (mappedArr.hasOwnProperty(id)) {
        mappedElem = mappedArr[id];
        // If the element is not at the root level, add it to its parent array of children.
        if (mappedElem.parentId) {
          mappedArr[mappedElem['parentId']]['children'].push(mappedElem)
          mappedArr[mappedElem['parentId']]['children'].sort((a, b) => this.sortFunc(a, b, "order", true))
        }
        // If the element is at the root level, add it to first level elements array.
        else {
          tree.push(mappedElem);
          tree.sort((a, b) => this.sortFunc(a, b, "order", true))
        }
      }
    }

    return tree;
  }


}

Vue.prototype.CONST = CONST

export default {
  ...CONST
}
