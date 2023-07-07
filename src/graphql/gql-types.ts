
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum WareHouseEnum {
    Virtual_Warehouse = "Virtual_Warehouse",
    Vehicle_Warehouse = "Vehicle_Warehouse",
    Physical_Warehouse = "Physical_Warehouse"
}

export enum FifoLifo {
    FIFO = "FIFO",
    LIFO = "LIFO"
}

export interface CreateWareHouseInput {
    description?: Nullable<string>;
    name?: Nullable<string>;
    authorizedGroupId?: Nullable<string>;
    wareHouseCode?: Nullable<string>;
    startHour?: Nullable<string>;
    endHour?: Nullable<string>;
    fifoLifo?: Nullable<FifoLifo>;
    tag?: Nullable<Nullable<string>[]>;
    wareHouseId?: Nullable<number>;
    height?: Nullable<number>;
    width?: Nullable<number>;
    length?: Nullable<number>;
    area?: Nullable<number>;
    volume?: Nullable<number>;
    type?: Nullable<WareHouseEnum>;
    Location?: Nullable<LocationInputType>;
}

export interface LocationInputType {
    label?: Nullable<Nullable<string>[]>;
    id?: Nullable<string>;
}

export interface IQuery {
    movies(): Nullable<Nullable<Movie>[]> | Promise<Nullable<Nullable<Movie>[]>>;
    movie(id: number): Nullable<Movie> | Promise<Nullable<Movie>>;
    wareHouses(): Nullable<WareHouse[]> | Promise<Nullable<WareHouse[]>>;
    wareHouse(id: number): Nullable<WareHouse> | Promise<Nullable<WareHouse>>;
    UserInventory(): Nullable<Inventory> | Promise<Nullable<Inventory>>;
}

export interface Movie {
    id: number;
    tagline?: Nullable<string>;
    title: string;
    released: number;
    actors?: Nullable<Nullable<Person>[]>;
    directors?: Nullable<Nullable<Person>[]>;
}

export interface Person {
    name: string;
    born?: Nullable<number>;
    actedInMovies?: Nullable<Nullable<Movie>[]>;
    directedMovies?: Nullable<Nullable<Movie>[]>;
}

export interface IMutation {
    createWareHouse(createWareHouseInput: CreateWareHouseInput): WareHouse | Promise<WareHouse>;
}

export interface WareHouseLocation {
    id?: Nullable<number>;
    key?: Nullable<string>;
    name?: Nullable<string>;
    description?: Nullable<string>;
}

export interface WareHouseProperties {
    name?: Nullable<string>;
    canDisplay?: Nullable<boolean>;
    isDeleted?: Nullable<boolean>;
    canDelete?: Nullable<boolean>;
    description?: Nullable<string>;
    endHour?: Nullable<string>;
    startHour?: Nullable<string>;
    createdBy?: Nullable<string>;
    fifoLifo?: Nullable<string>;
    structureType?: Nullable<string>;
    location?: Nullable<WareHouseLocation>;
    className?: Nullable<string>;
    trId?: Nullable<string>;
    tag?: Nullable<string[]>;
    area?: Nullable<number>;
    volume?: Nullable<number>;
    width?: Nullable<number>;
    length?: Nullable<number>;
    height?: Nullable<number>;
    updatedAt?: Nullable<string>;
    createdAt?: Nullable<string>;
    type?: Nullable<string>;
    userReferenceId?: Nullable<string>;
    wareHouseCode?: Nullable<string>;
}

export interface WareHouse {
    id?: Nullable<number>;
    labels?: Nullable<string[]>;
    properties?: Nullable<WareHouseProperties>;
    materials?: Nullable<Nullable<Material>[]>;
}

export interface Material {
    id?: Nullable<number>;
    labels?: Nullable<string[]>;
    properties?: Nullable<MaterialProperties>;
}

export interface MaterialProperties {
    name?: Nullable<string>;
    canDisplay?: Nullable<boolean>;
    isDeleted?: Nullable<boolean>;
    canDelete?: Nullable<boolean>;
    description?: Nullable<string>;
    trId?: Nullable<string>;
    tag?: Nullable<Nullable<string>[]>;
    count?: Nullable<number>;
    updatedAt?: Nullable<string>;
    createdAt?: Nullable<string>;
    type?: Nullable<string>;
    measurementUnit?: Nullable<string>;
    referenceId?: Nullable<string>;
}

export interface InventoryProperties {
    name?: Nullable<string>;
    canDisplay?: Nullable<boolean>;
    isDeleted?: Nullable<boolean>;
    canDelete?: Nullable<boolean>;
    createdBy?: Nullable<string>;
    trId?: Nullable<string>;
    updatedAt?: Nullable<string>;
    createdAt?: Nullable<string>;
}

export interface Inventory {
    id?: Nullable<number>;
    labels?: Nullable<Nullable<string>[]>;
    properties?: Nullable<InventoryProperties>;
    materials?: Nullable<Nullable<Material>[]>;
}

type Nullable<T> = T | null;
