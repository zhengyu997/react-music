import { SeachList, MList, TABSKEY } from "./active-type"
const SeachState = {
    loading: false,
    list: [],
}
export function SeachMusic(state = SeachState, action) {
    // console.log(state.loading)
    switch (action.type) {
        case SeachList:
            return action.data
        default:
            return state
    }

}
const defaultState = {
    list: []
}

export function musiclists(state = defaultState, action) {

    switch (action.type) {
        case MList:
            return action.data
        default:
            return state
    }

}
export function TabsKey(state = 1, action) {
    switch (action.type) {
        case TABSKEY:
            return action.data
        default:
            return state
    }
}