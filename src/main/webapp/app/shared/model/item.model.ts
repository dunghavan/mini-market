import { Type } from 'app/shared/model/type.model';
import { Image } from 'app/shared/model/image.model';

export interface User {
    activated?: boolean;
    createdDate?: Date;
    email?: string;
    firstName?: string;
    lastName?: string;
}

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
    user?: user;
}

export class user implements User {
    constructor(
        public activated?: boolean,
        public createdDate?: Date,
        public email?: string,
        public firstName?: string,
        public lastName?: string
    ) {}
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
        public images?: Image[],
        public user?: user
    ) {}
}

export interface state {
    conhang: boolean;
    hethang: boolean;
}

export interface status {
    moi: boolean;
    cu: boolean;
}

export interface price_scale {
    under100: boolean;
    from100_1000: boolean;
    from1000_10000: boolean;
    over10000: boolean;
}

export interface type {
    quan?: boolean;
    ao?: boolean;
    giay_dep?: boolean;
}

export interface sort {
    name: boolean;
    date: boolean;
    price_low: boolean;
    price_high: boolean;
    current_sort: number;
}

export class Sort implements sort {
    constructor(public name = false, public date = false, public price_low = false, public price_high = false, public current_sort = -1) {}
}

export class Filter_State implements state {
    constructor(public conhang = false, public hethang = false) {}
}

export class Filter_Status implements status {
    constructor(public moi = false, public cu = false) {}
}

export class Filter_Price implements price_scale {
    constructor(public under100 = false, public from100_1000 = false, public from1000_10000 = false, public over10000 = false) {}
}

export class Filter_type implements type {
    constructor(public quan?: boolean, public ao?: boolean, public giay_dep?: boolean) {}
}
