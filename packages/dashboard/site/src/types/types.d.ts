export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

/** 用户 */
export type CreateUserInput = {
  /** 用户名 */
  name?: Maybe<Scalars['String']>,
  /** 年龄 */
  age?: Maybe<Scalars['Float']>,
};

/** dev dashboard */
export type Dashboard = {
   __typename?: 'Dashboard',
  env: Scalars['String'],
  baseDir: Scalars['String'],
  pluginStore: Array<PluginItem>,
  middlewareStore: Array<MiddlewareItem>,
  routerStore: Array<RouteItem>,
};

export type MiddlewareItem = {
   __typename?: 'MiddlewareItem',
  name: Scalars['String'],
  enable: Scalars['Boolean'],
  use: Scalars['String'],
};

export type Mutation = {
   __typename?: 'Mutation',
  /** users */
  createUser: User,
};


export type MutationCreateUserArgs = {
  input: CreateUserInput
};

export type PluginItem = {
   __typename?: 'PluginItem',
  name: Scalars['String'],
  enable: Scalars['Boolean'],
  package: Scalars['String'],
};

export type Query = {
   __typename?: 'Query',
  user?: Maybe<User>,
  /** users */
  users: Array<User>,
  _devDashboard?: Maybe<Dashboard>,
};

export type RouteItem = {
   __typename?: 'RouteItem',
  method: Scalars['String'],
  path: Scalars['String'],
  methodName: Scalars['String'],
  handler: Scalars['String'],
  instance: Scalars['String'],
};

/** user */
export type User = {
   __typename?: 'User',
  name?: Maybe<Scalars['String']>,
  age?: Maybe<Scalars['Float']>,
  email?: Maybe<Scalars['String']>,
};
