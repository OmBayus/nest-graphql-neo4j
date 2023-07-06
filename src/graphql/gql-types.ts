
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface IQuery {
    movies(): Nullable<Movie[]> | Promise<Nullable<Movie[]>>;
}

export interface Movie {
    id: number;
    tagline?: Nullable<string>;
    title: string;
    released: number;
}

type Nullable<T> = T | null;
