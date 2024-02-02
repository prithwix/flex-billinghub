import { PagerPosition, PagerType } from "@progress/kendo-angular-grid/pager/pager-settings";

const pageSizes = [5, 10, 15];
const previousNext = true;
const position: PagerPosition = "bottom";
const info = true;
const buttonCount = 10;
const type: PagerType = "numeric";
const countChildren = true;
const pageSize = 5;
export const PageableSettings = {
    buttonCount: buttonCount,
    info: info,
    type: type,
    pageSizes: pageSizes,
    previousNext: previousNext,
    position: position,
    countChildren: countChildren,
    pageSize: pageSize
};