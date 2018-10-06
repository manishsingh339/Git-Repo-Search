const initialState = {};

export const reposData = (state = initialState, action) => {
  switch (action.type) {
    case "SEARCH_REPOS":
      return { ...state, repos: action.payload }
    default:
      return state
  }
}
