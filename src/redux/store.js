import { createStore, combineReducers } from "redux"
import { SeachMusic, musiclists, TabsKey } from "./redecers"


const chatReducer = combineReducers({
    SeachMusic,
    musiclists,
    TabsKey
})
const store = createStore(chatReducer, window.STATE_FROM_SERVER)

export default store