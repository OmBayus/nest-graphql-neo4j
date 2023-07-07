
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreateMovieInput {
    title?: Nullable<string>;
    released?: Nullable<number>;
    tagline?: Nullable<string>;
}

export interface UpdateMovieInput {
    title?: Nullable<string>;
    released?: Nullable<number>;
    tagline?: Nullable<string>;
}

export interface IMutation {
    createMovie(createMovieInput: CreateMovieInput): Movie | Promise<Movie>;
    updateMovie(id: number, updateMovieInput: UpdateMovieInput): Movie | Promise<Movie>;
    deleteMovie(id: number): Movie | Promise<Movie>;
}

export interface IQuery {
    movies(): Nullable<Nullable<Movie>[]> | Promise<Nullable<Nullable<Movie>[]>>;
    movie(id: number): Nullable<Movie> | Promise<Nullable<Movie>>;
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

type Nullable<T> = T | null;
