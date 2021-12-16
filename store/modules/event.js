import * as types from "../mutation-types";
import {
  headerConfig,
  getDomain,
  axiosInstance,
} from "@/fetch/vuexAxiosConfig";
import moment from "moment";

// initial state
const state = () => ({
  volunteerEventData: null,
  enterpriseEventData: null,
  supplyEventData: null,
  eventData: {},
  npoPromoteData: {},
});

// getters
const getters = {
  volunteerEventDataGetter: (state) => state.volunteerEventData,
  enterpriseEventDataGetter: (state) => state.enterpriseEventData,
  supplyEventDataGetter: (state) => state.supplyEventData,
  eventDataGetter: (state) => state.eventData,
  npoPromoteDataGetter: (state) => state.npoPromoteData,
};
// 愛心小編推薦
let eventConfig = {
  page: 0,
  size: 3,
};
// actions
const actions = {
  // =============愛心小編推薦 start=============
  // 公益活動
  /*
    先查詢活動API條件promo = true的活動，如果未滿三筆，
    則繼續查詢條件為依照活動即將結束日期由近至遠，
    都須符合活動已額滿已結束不出現
  */
  async getEvent(context, params) {
    // 搜尋條件處理
    let paramsHandler = () => {
      if (!params) {
        return {
          params: {
            ...eventConfig,
            search: `isFull eq false and closeDate gte '${moment().format(
              "YYYY-MM-DD HH:mm:ss'"
            )} and promote eq true`,
          },
        };
      } else {
        return {
          params: {
            page: eventConfig.page,
            size: eventConfig.size - context.state.eventData.results.length,
            search: `isFull eq false and closeDate gte '${moment().format(
              "YYYY-MM-DD HH:mm:ss'"
            )} and promote eq false`,
            sort: `closeDate,asc`,
          },
        };
      }
    };
    if (
      context.state.eventData.results &&
      context.state.eventData.results.length >= 3
    ) {
      return;
    } else {
      let { method, requestUrl } = service.getEvents;
      return axiosInstance({
        method: method,
        url: `${getDomain()}${requestUrl}`,
        ...headerConfig(),
        ...paramsHandler(),
      })
        .then((res) => {
          context.commit(types.GET_EVENT, res.data);
          if (
            !params &&
            context.state.eventData.results.length < eventConfig.size
          ) {
            return context.dispatch("getEvent", "closeDateSort");
          }
        })
        .catch((err) => {
          console.warn("#### geEvent fail! #### (" + err + ") ");
        });
    }
  },

  // 公益社團及機購
  getNpoPromote(context) {
    if (
      context.state.npoPromoteData.results &&
      context.state.npoPromoteData.results.length > 0
    )
      return;
    let { method, requestUrl } = service.getNpoPromote;

    return axiosInstance({
      method: method,
      url: `${getDomain()}${requestUrl}`,
      ...headerConfig(),
      params: {
        ...eventConfig,
      },
    })
      .then((res) => {
        context.commit(types.GET_NPOPROMOTE, res.data);
      })
      .catch((err) => {
        console.warn("#### getNpoEvent fail! #### (" + err + ") ");
      });
  },
  // =============愛心小編推薦 end=============
  getVolunteerEvent(context, params) {
    let { method, requestUrl } = service.getVolunteerEvent;
    return axiosInstance({
      method: method,
      url: `${getDomain()}${requestUrl}`,
      ...headerConfig(),
      params: {
        ...params,
        sort: `pubDate,desc`,
      },
    })
      .then((res) => {
        context.commit(types.GET_VOLUNTEEREVENT, res.data);
      })
      .catch((err) => {
        console.warn("#### getVolunteerData fail! #### (" + err + ") ");
      });
  },
  getEnterpriseEvent(context, params) {
    let { method, requestUrl } = service.getEnterpriseEvent;
    // return axios[method](
    //   `${getDomain()}${requestUrl}`,
    //   Object.assign({}, headerConfig(), {
    //     params: {
    //       ...params,
    //       sort: `pubDate,desc`,
    //     },
    //   })
    // )
    return axiosInstance({
      method: method,
      url: `${getDomain()}${requestUrl}`,
      ...headerConfig(),
      params: {
        ...params,
        sort: `pubDate,desc`,
      },
    })
      .then((res) => {
        context.commit(types.GET_ENTERPRISEEVENT, res.data);
      })
      .catch((err) => {
        console.warn("#### getEnterpriseData fail! #### (" + err + ") ");
      });
  },
  getSupplyEvent(context, params) {
    let { method, requestUrl } = service.getSupplyEvent;
    // return axios[method](
    //   `${getDomain()}${requestUrl}`,
    //   Object.assign({}, headerConfig(), {
    //     params: {
    //       ...params,
    //       sort: `pubDate,desc`,
    //     },
    //   })
    // )
    return axiosInstance({
      method: method,
      url: `${getDomain()}${requestUrl}`,
      ...headerConfig(),
      params: {
        ...params,
        sort: `pubDate,desc`,
      },
    })
      .then((res) => {
        context.commit(types.GET_SUPPLYEVENT, res.data);
      })
      .catch((err) => {
        console.warn("#### getSupplyData fail! #### (" + err + ") ");
      });
  },
};

// mutations
const mutations = {
  [types.GET_EVENT](state, res) {
    if (state.eventData.results && state.eventData.results.length > 0) {
      res.results.forEach((item) => {
        if (state.eventData.results.length === eventConfig.size) return;
        state.eventData.results.forEach((stateItem) => {
          if (
            stateItem.id !== item.id &&
            state.eventData.results.length < eventConfig.size
          ) {
            state.eventData.results.push(item);
          }
        });
      });
    } else {
      state.eventData = res;
    }
  },
  [types.GET_NPOPROMOTE](state, res) {
    res.results.forEach((item) => {
      item.isNpoFlag = true;
    });
    state.npoPromoteData = res;
  },
  [types.GET_VOLUNTEEREVENT](state, res) {
    state.volunteerEventData = res;
  },
  [types.GET_ENTERPRISEEVENT](state, res) {
    state.enterpriseEventData = res;
  },
  [types.GET_SUPPLYEVENT](state, res) {
    state.supplyEventData = res;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
