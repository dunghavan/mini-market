import { IItem } from 'app/shared/model//item.model';

export interface IType {
    id?: number;
    name?: string;
    desc?: string;
    items?: IItem[];
}

export class Type implements IType {
    constructor(public id?: number, public name?: string, public desc?: string, public items?: IItem[]) {}
}
