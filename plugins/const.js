import Vue from 'vue'

const CONST = {
  PRODUCTION: "production",
  DEVELOPMENT: "development",
  MENUTYPE: {
    BLOCK: 'block',
    SINGLE: 'single',
    MULTI: 'multi'
  },
  menuType() {
    return [{
        text: "페이지",
        value: CONST.MENUTYPE.SINGLE
      },
      {
        text: "게시판",
        value: CONST.MENUTYPE.MULTI
      },
      {
        text: "단순메뉴",
        value: CONST.MENUTYPE.BLOCK
      }
    ]
  },
  ArrayMove: function (array, from, to) {
    const newArray = [...array];

    if (from === to) return newArray;

    const target = newArray[from];
    const inc = to < from ? -1 : 1;

    for (let i = from; i !== to; i += inc) {
      newArray[i] = newArray[i + inc];
    }

    newArray[to] = target;

    return newArray;
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
      mappedArr[arrElem.id]['depth'] = arrElem.parentId ? '' : 0
    }

    for (var id in mappedArr) {
      if (mappedArr.hasOwnProperty(id)) {
        mappedElem = mappedArr[id];
        // If the element is not at the root level, add it to its parent array of children.
        if (mappedElem.parentId) {
          mappedElem['familyName'] = mappedArr[mappedElem['parentId']]['familyName'] + "-" + mappedElem.name
          mappedElem['depth'] = mappedArr[mappedElem['parentId']]['depth'] + 1
          mappedArr[mappedElem['parentId']]['children'].push(mappedElem)
          mappedArr[mappedElem['parentId']]['children'].sort((a, b) => this.sortFunc(a, b, "order", true))
        }
        // If the element is at the root level, add it to first level elements array.
        else {
          mappedElem['familyName'] = mappedElem.name
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
