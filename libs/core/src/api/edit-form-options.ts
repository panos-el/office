export interface EditFormOptions {
    parentUrl: string;
    createUrl: string;
    editUrl: string;
    editParams?: { [key: string]: any };
    createParams?: { [key: string]: any };
}