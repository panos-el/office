export interface PersistStateItem {
    id: number;
    customerId: number;
    name: string;
    primary: boolean;
    persistType: string;
    token?: string;
    displayOrder: number;
}