
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface IQuery {
    movies(): Nullable<Nullable<Movie>[]> | Promise<Nullable<Nullable<Movie>[]>>;
    movie(id: number): Nullable<Movie> | Promise<Nullable<Movie>>;
}

export interface Movie {
    id: number;
    tagline?: Nullable<string>;
    title: string;
    released: number;
    actors?: Nullable<Person[]>;
    director: Person;
}

export interface Person {
    name: string;
    born: number;
    actedInMovies?: Nullable<Nullable<Movie>[]>;
    directedMovies?: Nullable<Nullable<Movie>[]>;
}

type Nullable<T> = T | null;
