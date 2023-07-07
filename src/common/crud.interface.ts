export interface crudInterface<T> {
    getAll(): Promise<T[]> | T[];
    getOne(id: number): Promise<T> | T;
    create(t: any): Promise<T> | T;
    update(id: number, t: any): Promise<T> | T;
    delete(id: number): Promise<T> | T;

}