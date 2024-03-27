// Define initial state for the products
const initialState = {
  products: [],
  error: null,
};

// Define your reducer function
export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PDATA_SUCCESS":
      return {
        ...state,
        products: action.payload,
        error: null,
      };
    case "FAILED_GET_PDATA":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};


