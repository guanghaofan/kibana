/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { Duration } from 'moment';

import { ByteSizeValue } from './byte_size_value';
import { ContextReference, Reference, SiblingReference } from './references';
import {
  AnyType,
  ArrayOptions,
  ArrayType,
  BooleanType,
  ByteSizeOptions,
  ByteSizeType,
  ConditionalType,
  DurationOptions,
  DurationType,
  LiteralType,
  MapOfOptions,
  MapOfType,
  MaybeType,
  NumberOptions,
  NumberType,
  ObjectType,
  Props,
  StringOptions,
  StringType,
  Type,
  TypeOf,
  TypeOptions,
  UnionType,
} from './types';

export { AnyType, ObjectType, TypeOf };
export { ByteSizeValue } from './byte_size_value';

function boolean(options?: TypeOptions<boolean>): Type<boolean> {
  return new BooleanType(options);
}

function string(options?: StringOptions): Type<string> {
  return new StringType(options);
}

function literal<T extends string | number | boolean>(value: T): Type<T> {
  return new LiteralType(value);
}

function number(options?: NumberOptions): Type<number> {
  return new NumberType(options);
}

function byteSize(options?: ByteSizeOptions): Type<ByteSizeValue> {
  return new ByteSizeType(options);
}

function duration(options?: DurationOptions): Type<Duration> {
  return new DurationType(options);
}

/**
 * Create an optional type
 */
function maybe<V>(type: Type<V>): Type<V | undefined> {
  return new MaybeType(type);
}

function object<P extends Props>(
  props: P,
  options?: TypeOptions<{ [K in keyof P]: TypeOf<P[K]> }>
): ObjectType<P> {
  return new ObjectType(props, options);
}

function arrayOf<T>(itemType: Type<T>, options?: ArrayOptions<T>): Type<T[]> {
  return new ArrayType(itemType, options);
}

function mapOf<K, V>(
  keyType: Type<K>,
  valueType: Type<V>,
  options?: MapOfOptions<K, V>
): Type<Map<K, V>> {
  return new MapOfType(keyType, valueType, options);
}

function oneOf<A, B, C, D, E, F, G, H, I, J>(
  types: [Type<A>, Type<B>, Type<C>, Type<D>, Type<E>, Type<F>, Type<G>, Type<H>, Type<I>, Type<J>],
  options?: TypeOptions<A | B | C | D | E | F | G | H | I | J>
): Type<A | B | C | D | E | F | G | H | I | J>;
function oneOf<A, B, C, D, E, F, G, H, I>(
  types: [Type<A>, Type<B>, Type<C>, Type<D>, Type<E>, Type<F>, Type<G>, Type<H>, Type<I>],
  options?: TypeOptions<A | B | C | D | E | F | G | H | I>
): Type<A | B | C | D | E | F | G | H | I>;
function oneOf<A, B, C, D, E, F, G, H>(
  types: [Type<A>, Type<B>, Type<C>, Type<D>, Type<E>, Type<F>, Type<G>, Type<H>],
  options?: TypeOptions<A | B | C | D | E | F | G | H>
): Type<A | B | C | D | E | F | G | H>;
function oneOf<A, B, C, D, E, F, G>(
  types: [Type<A>, Type<B>, Type<C>, Type<D>, Type<E>, Type<F>, Type<G>],
  options?: TypeOptions<A | B | C | D | E | F | G>
): Type<A | B | C | D | E | F | G>;
function oneOf<A, B, C, D, E, F>(
  types: [Type<A>, Type<B>, Type<C>, Type<D>, Type<E>, Type<F>],
  options?: TypeOptions<A | B | C | D | E | F>
): Type<A | B | C | D | E | F>;
function oneOf<A, B, C, D, E>(
  types: [Type<A>, Type<B>, Type<C>, Type<D>, Type<E>],
  options?: TypeOptions<A | B | C | D | E>
): Type<A | B | C | D | E>;
function oneOf<A, B, C, D>(
  types: [Type<A>, Type<B>, Type<C>, Type<D>],
  options?: TypeOptions<A | B | C | D>
): Type<A | B | C | D>;
function oneOf<A, B, C>(
  types: [Type<A>, Type<B>, Type<C>],
  options?: TypeOptions<A | B | C>
): Type<A | B | C>;
function oneOf<A, B>(types: [Type<A>, Type<B>], options?: TypeOptions<A | B>): Type<A | B>;
function oneOf<A>(types: [Type<A>], options?: TypeOptions<A>): Type<A>;
function oneOf<RTS extends AnyType[]>(types: RTS, options?: TypeOptions<any>): Type<any> {
  return new UnionType(types, options);
}

function contextRef<T>(key: string): ContextReference<T> {
  return new ContextReference(key);
}

function siblingRef<T>(key: string): SiblingReference<T> {
  return new SiblingReference(key);
}

function conditional<A, B, C>(
  leftOperand: Reference<A>,
  rightOperand: Reference<A> | A,
  equalType: Type<B>,
  notEqualType: Type<C>,
  options?: TypeOptions<B | C>
) {
  return new ConditionalType(leftOperand, rightOperand, equalType, notEqualType, options);
}

export const schema = {
  arrayOf,
  boolean,
  byteSize,
  conditional,
  contextRef,
  duration,
  literal,
  mapOf,
  maybe,
  number,
  object,
  oneOf,
  siblingRef,
  string,
};

export type Schema = typeof schema;
