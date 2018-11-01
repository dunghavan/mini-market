
export class State {
    id?: number;
    name?: string;
    displayName?: string;

    static getStates(): State[] {
        return [{id: 1, name: 'new', displayName: 'Mới 100%'},
            {id: 0, name: 'old', displayName: 'Đã qua sử dụng'}];
    }
}

