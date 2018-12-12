export class Status {
    id?: number;
    name?: string;
    displayName?: string;

    static getStatus(): Status[] {
        return [{ id: 1, name: 'available', displayName: 'Còn hàng' }, { id: 0, name: 'unavailable', displayName: 'Hết hàng' }];
    }
}
