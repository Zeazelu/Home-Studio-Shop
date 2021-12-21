const { TAILORMADE_LIST_REQUEST, TAILORMADE_LIST_SUCCESS, TAILORMADE_LIST_FAIL, TAILORMADE_DETAILS_REQUEST, TAILORMADE_DETAILS_SUCCESS, TAILORMADE_DETAILS_FAIL, TAILORMADE_CREATE_REQUEST, TAILORMADE_CREATE_SUCCESS, TAILORMADE_CREATE_FAIL, TAILORMADE_CREATE_RESET, TAILORMADE_DELETE_REQUEST, TAILORMADE_DELETE_SUCCESS, TAILORMADE_DELETE_FAIL, TAILORMADE_DELETE_RESET, TAILORMADE_UPDATE_REQUEST, TAILORMADE_UPDATE_SUCCESS, TAILORMADE_UPDATE_FAIL, TAILORMADE_UPDATE_RESET } = require('../constants/tailormadeConstants');
export const tailormadeListReducer = (
    state = { loading: true, tailormades: [] },
    action
) => {
    switch (action.type) {
        case TAILORMADE_LIST_REQUEST:
            return { loading: true };
        case TAILORMADE_LIST_SUCCESS:
            return { loading: false, tailormades: action.payload };
        case TAILORMADE_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const tailormadeDetailsReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case TAILORMADE_DETAILS_REQUEST:
            return { loading: true };
        case TAILORMADE_DETAILS_SUCCESS:
            return { loading: false, tailormade: action.payload };
        case TAILORMADE_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const tailormadeCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case TAILORMADE_CREATE_REQUEST:
      return { loading: true };
    case TAILORMADE_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case TAILORMADE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case TAILORMADE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
  
  export const tailormadeUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case TAILORMADE_UPDATE_REQUEST:
        return { loading: true };
      case TAILORMADE_UPDATE_SUCCESS:
        return { loading: false, success: true };
      case TAILORMADE_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case TAILORMADE_UPDATE_RESET:
        return {};
      default:
        return state;
    }
  };

  export const tailormadeDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case TAILORMADE_DELETE_REQUEST:
        return { loading: true };
      case TAILORMADE_DELETE_SUCCESS:
        return { loading: false, success: true };
      case TAILORMADE_DELETE_FAIL:
        return { loading: false, error: action.payload };
      case TAILORMADE_DELETE_RESET:
        return {};
      default:
        return state;
    }
  };