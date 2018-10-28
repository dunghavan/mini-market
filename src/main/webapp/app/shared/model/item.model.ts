export interface IItem {
    id?: number;
    name?: string;
    desc?: string;
    price?: number;
    status?: string;
    note?: string;
    deliveryWay?: string;
    address?: string;
    createdDate?: Date;
    lastModifiedDate?: Date;
}

export class Item implements IItem {
    constructor(
        public id?: number,
        public name?: string,
        public desc?: string,
        public price?: number,
        public status?: string,
        public note?: string,
        public deliveryWay?: string,
        public address?: string,
        public createdDate?: Date,
        public lastModifiedDate?: Date
    ) {}
}
