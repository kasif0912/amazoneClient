import { api } from "../apiConfig";

export const getProducts = () => async (dispatch) => {
  try {
    const res = await api.get("/getproducts");
    // console.log(res.data);
    dispatch({ type: "GET_PDATA_SUCCESS", payload: res.data });
  } catch (error) {
    dispatch({ type: "FAILED_GET_PDATA", payload: error.response });
    console.log("error" + error.message);
  }
};
