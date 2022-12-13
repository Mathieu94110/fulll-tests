import { UsersInterface } from 'interfaces/users.interface';

export function deepCopy(source: UsersInterface[]): UsersInterface[] {
  return Array.isArray(source)
    ? source.map((item: any) => deepCopy(item))
    : source && typeof source === 'object'
    ? Object.getOwnPropertyNames(source).reduce((o, prop) => {
        Object.defineProperty(
          o,
          prop,
          Object.getOwnPropertyDescriptor(source, prop)!
        );
        o[prop] = deepCopy((source as { [key: string]: any })[prop]);
        return o;
      }, Object.create(Object.getPrototypeOf(source)))
    : (source as UsersInterface[]);
}
