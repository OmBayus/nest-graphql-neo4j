export interface crudInterface<T> {
    getAll(): Promise<T[]> | T[];
    getOne(id: number): Promise<T> | T;
    create(t: T): Promise<T> | T;
    update(id: number, t: T): Promise<T> | T;
    delete(id: number): Promise<T> | T;

}