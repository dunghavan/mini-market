export interface Iitem_des {
    Item_id: number;
    Item_image_url: string;
    Item_name: string;
    Item_price: string;
    Item_address: string;
    Item_date_time: string;
    User_name: string;
    User_rating: number;
}

export class Item_des implements Iitem_des {
    constructor();
}
