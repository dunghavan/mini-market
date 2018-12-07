import { Type } from 'app/shared/model/type.model';
import { Image } from 'app/shared/model/image.model';

export interface IItem {
    id?: number;
    name?: string;
    desc?: string;
    price?: number;
    isAvailable?: boolean;
    note?: string;
    state?: boolean;
    deliveryWay?: string;
    address?: string;
    createdDate?: Date;
    lastModifiedDate?: Date;
    type?: Type;
    phone?: string;
    images?: Image[];
}

export class Item implements IItem {
    constructor(
        public id?: number,
        public name?: string,
        public desc?: string,
        public price?: number,
        public isAvailable?: boolean,
        public note?: string,
        public state?: boolean,
        public deliveryWay?: string,
        public address?: string,
        public createdDate?: Date,
        public lastModifiedDate?: Date,
        public type?: Type,
        public phone?: string,
        public images?: Image[]
    ) {}
}
