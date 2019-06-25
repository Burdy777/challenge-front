export interface StorageRepository {
    set(key:string, value:string);
    get(key:string);
    getByKey(index:number);
    remove(key:string);
    has(key:string): boolean;
    isEmpty():boolean;
    length():number;
    clear();
}