import { SeachList, MList, TABSKEY } from "../redux/active-type"


// export const incrementCreator = (number) => ({ type: INCREMENT, data: number })
// export const decrementCreator = (number) => ({ type: DECREMENT, data: number })
export const MusList = (array) => ({ type: MList, data: array })
export const Seach = (array) => ({ type: SeachList, data: array })
export const TabsKey = (number) => ({ type: TABSKEY, data: number })