import Vue from 'vue'

const CONST = {
  PRODUCTION: "production",
  DEVELOPMENT: "development",
  CATEGORY: {
    ORG_GREETING: "orggreeting", //인사말
    ORG_HISTORY: "orghistory", //연혁
    ORG_CHART: "orgchart", //조직도

  }


}

Vue.prototype.CONST = CONST

export default {
  ...CONST
}
