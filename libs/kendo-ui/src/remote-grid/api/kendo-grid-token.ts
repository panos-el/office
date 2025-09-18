export abstract class KendoGridToken {
    abstract reloadData(): Promise<void>;
    abstract clearSelectedKeys(): void;
    abstract getSelectedKeys(): number[];
}