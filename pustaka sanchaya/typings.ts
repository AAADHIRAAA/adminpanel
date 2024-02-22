/* eslint-disable */
import {
  CollectionCustomizer,
  TAggregation,
  TConditionTree,
  TPaginatedFilter,
  TPartialRow,
  TSortClause
} from '@forestadmin/agent';

export type BooksCustomizer = CollectionCustomizer<Schema, 'books'>;
export type BooksRecord = TPartialRow<Schema, 'books'>;
export type BooksConditionTree = TConditionTree<Schema, 'books'>;
export type BooksFilter = TPaginatedFilter<Schema, 'books'>;
export type BooksSortClause = TSortClause<Schema, 'books'>;
export type BooksAggregation = TAggregation<Schema, 'books'>;

export type ProductsCustomizer = CollectionCustomizer<Schema, 'products'>;
export type ProductsRecord = TPartialRow<Schema, 'products'>;
export type ProductsConditionTree = TConditionTree<Schema, 'products'>;
export type ProductsFilter = TPaginatedFilter<Schema, 'products'>;
export type ProductsSortClause = TSortClause<Schema, 'products'>;
export type ProductsAggregation = TAggregation<Schema, 'products'>;


export type Schema = {
  'books': {
    plain: {
      '_id': string;
      'author_editor': string | null;
      'Date': string | null;
      'isbn': string | null;
      'language': string | null;
      'ProductForm': string | null;
      'publisher': string | null;
      'title': string | null;
    };
    nested: {};
    flat: {};
  };
  'products': {
    plain: {
      '_id': string;
      'author_editor': string | null;
      'Date': string | null;
      'isbn': string | null;
      'language': string | null;
      'ProductForm': string | null;
      'publisher': string | null;
      'title': string | null;
    };
    nested: {};
    flat: {};
  };
};
