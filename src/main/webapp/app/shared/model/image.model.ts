import { IItem } from 'app/shared/model//item.model';

export interface IImage {
    id?: number;
    name?: string;
    desc?: string;
    content?: string;
    item?: IItem;
    url?: string;
}

export class Image implements IImage {
    constructor(public id?: number, public name?: string, public desc?: string, public content?: string, public url?: string) {}
}
