export interface crudInterface<T> {
    getAll(): T[];
    getOne(id: number): T;
    create(t: T): T;
    update(id: number, t: T): T;
    delete(id: number): T;

}