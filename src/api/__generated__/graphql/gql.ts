/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "fragment Error on FieldError {\n  field\n  message\n}": types.ErrorFragmentDoc,
    "fragment User on User {\n  id\n  username\n  name\n  status\n}": types.UserFragmentDoc,
    "fragment DetailUser on User {\n  id\n  username\n  name\n  status\n}": types.DetailUserFragmentDoc,
    "mutation forgotPassword($data: ForgotPasswordInput!) {\n  forgotPassword(data: $data) {\n    errors {\n      ...Error\n    }\n    isSuccess\n  }\n}": types.ForgotPasswordDocument,
    "mutation login($data: LoginInput!) {\n  login(data: $data) {\n    errors {\n      ...Error\n    }\n    accessToken\n  }\n}": types.LoginDocument,
    "mutation register($data: RegisterInput!) {\n  register(data: $data) {\n    errors {\n      ...Error\n    }\n    isSuccess\n  }\n}": types.RegisterDocument,
    "mutation resetPassword($data: ResetPasswordInput!) {\n  resetPassword(data: $data) {\n    errors {\n      ...Error\n    }\n    accessToken\n  }\n}": types.ResetPasswordDocument,
    "mutation verifyAccount($data: VerifyAccountInput!) {\n  verifyAccount(data: $data) {\n    errors {\n      ...Error\n    }\n    isSuccess\n  }\n}": types.VerifyAccountDocument,
    "query getUser($where: UserWhereUniqueInput!) {\n  user(where: $where) {\n    ...User\n  }\n}": types.GetUserDocument,
    "query Users {\n  users {\n    ...User\n  }\n}": types.UsersDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Error on FieldError {\n  field\n  message\n}"): (typeof documents)["fragment Error on FieldError {\n  field\n  message\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment User on User {\n  id\n  username\n  name\n  status\n}"): (typeof documents)["fragment User on User {\n  id\n  username\n  name\n  status\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment DetailUser on User {\n  id\n  username\n  name\n  status\n}"): (typeof documents)["fragment DetailUser on User {\n  id\n  username\n  name\n  status\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation forgotPassword($data: ForgotPasswordInput!) {\n  forgotPassword(data: $data) {\n    errors {\n      ...Error\n    }\n    isSuccess\n  }\n}"): (typeof documents)["mutation forgotPassword($data: ForgotPasswordInput!) {\n  forgotPassword(data: $data) {\n    errors {\n      ...Error\n    }\n    isSuccess\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation login($data: LoginInput!) {\n  login(data: $data) {\n    errors {\n      ...Error\n    }\n    accessToken\n  }\n}"): (typeof documents)["mutation login($data: LoginInput!) {\n  login(data: $data) {\n    errors {\n      ...Error\n    }\n    accessToken\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation register($data: RegisterInput!) {\n  register(data: $data) {\n    errors {\n      ...Error\n    }\n    isSuccess\n  }\n}"): (typeof documents)["mutation register($data: RegisterInput!) {\n  register(data: $data) {\n    errors {\n      ...Error\n    }\n    isSuccess\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation resetPassword($data: ResetPasswordInput!) {\n  resetPassword(data: $data) {\n    errors {\n      ...Error\n    }\n    accessToken\n  }\n}"): (typeof documents)["mutation resetPassword($data: ResetPasswordInput!) {\n  resetPassword(data: $data) {\n    errors {\n      ...Error\n    }\n    accessToken\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation verifyAccount($data: VerifyAccountInput!) {\n  verifyAccount(data: $data) {\n    errors {\n      ...Error\n    }\n    isSuccess\n  }\n}"): (typeof documents)["mutation verifyAccount($data: VerifyAccountInput!) {\n  verifyAccount(data: $data) {\n    errors {\n      ...Error\n    }\n    isSuccess\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getUser($where: UserWhereUniqueInput!) {\n  user(where: $where) {\n    ...User\n  }\n}"): (typeof documents)["query getUser($where: UserWhereUniqueInput!) {\n  user(where: $where) {\n    ...User\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Users {\n  users {\n    ...User\n  }\n}"): (typeof documents)["query Users {\n  users {\n    ...User\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;