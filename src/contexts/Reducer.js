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
        accessToken: undefined,
      };
    case "Add name":
      return {
        ...state,
        userName: action.data,
      };
    case "Remove name":
      return {
        ...state,
        userName: "",
      };

    case "Update Data":
      return {
        ...state,
        data: action.data,
      };

    case "AddOxygen":
      return {
        ...state,
        Oxygen: action.data,
      };
    case "AddNormalBeds":
      return {
        ...state,
        Normal: action.data,
      };
    case "AddICUBeds":
      return {
        ...state,
        Icu: action.data,
      };
    case "AddDoctors":
      return {
        ...state,
        Doctor: action.data,
      };
    case "AddVaccineAvailable":
      return {
        ...state,
        Available: action.data,
      };
    case "AddVaccineName":
      return {
        ...state,
        VaccineName: action.data,
      };
    case "AddQuantity":
      return {
        ...state,
        Quantity: action.data,
      };
    case "AddHospitalLocation":
      return {
        ...state,
        NewHospitalLocation: action.data,
      };
    default:
      return state;
  }
};
export default reducer;
