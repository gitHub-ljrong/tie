import { Container } from '@tiejs/common'
import { Token } from './Token'
import { ObjectType } from './types/ObjectType'
import { ServiceIdentifier } from './types/ServiceIdentifier'
import { ServiceMetadata } from './types/ServiceMetadata'

/**
 * Service container.
 */
export class Tester {
  /**
   * Retrieves the service with given name or type from the service container.
   * Optionally, parameters can be passed in case if instance is initialized in the container for the first time.
   */
  static get<T>(type: ObjectType<T>): T

  /**
   * Retrieves the service with given name or type from the service container.
   * Optionally, parameters can be passed in case if instance is initialized in the container for the first time.
   */
  static get<T>(id: string): T

  /**
   * Retrieves the service with given name or type from the service container.
   * Optionally, parameters can be passed in case if instance is initialized in the container for the first time.
   */
  static get<T>(id: Token): T

  /**
   * Retrieves the service with given name or type from the service container.
   * Optionally, parameters can be passed in case if instance is initialized in the container for the first time.
   */
  static get<T>(service: { service: T }): T

  /**
   * Retrieves the service with given name or type from the service container.
   * Optionally, parameters can be passed in case if instance is initialized in the container for the first time.
   */
  static get<T>(identifier: ServiceIdentifier<T>): T {
    return Container.get(identifier as any)
  }

  /**
   * Sets a value for the given type or service name in the container.
   */
  static mock<T, K extends keyof T>(service: ServiceMetadata<T, K>): Tester

  /**
   * Sets a value for the given type or service name in the container.
   */
  static mock(type: Function, value: any): Tester

  /**
   * Sets a value for the given type or service name in the container.
   */
  static mock(name: string, value: any): Tester

  /**
   * Sets a value for the given type or service name in the container.
   */
  static mock(token: Token, value: any): Tester

  /**
   * Sets a value for the given type or service name in the container.
   */
  static mock<T, K extends keyof T>(values: ServiceMetadata<T, K>[]): Tester

  /**
   * Sets a value for the given type or service name in the container.
   */
  static mock(
    identifierOrServiceMetadata:
      | ServiceIdentifier
      | ServiceMetadata<any, any>
      | (ServiceMetadata<any, any>[]),
    value?: any,
  ): Tester {
    Container.set(identifierOrServiceMetadata as any, value)
    return this
  }
}
