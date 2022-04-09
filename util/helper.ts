import values from "lodash/values";
import groupBy from "lodash/groupBy";

export const countDuplcateInArray = (arr: string[]) => {
    return values(groupBy(arr)).map((d: any)=> ({name: d[0], count: d.length}));
}