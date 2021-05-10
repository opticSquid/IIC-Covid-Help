const reducer = (state, action) => {
  switch (action.type) {
    case "Add Token":
      return {
        ...state,
        accessToken: action.data,
      };
    case "Remove Token":
      return {
        ...state,
        accessToken: null,
      };
    default:
      return state;
  }
};
export default reducer;
