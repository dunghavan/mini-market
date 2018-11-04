export class ItemDetail {
    MAX_IMAGE_DISPLAY = 4;
    current_image_select: number;
    current_image_url: string;
    image_url: Array<string> = [];
    item_id: number;
    item_name: string;
    item_price: string;
    item_date_time: string;
    item_type: string;
    item_sell_status: string;
    item_current_status: string;
    item_ship_status: string;
    item_description: string;
    constructor() {}
}
