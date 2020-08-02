/** Partial of an object type that is also partial for nested objects
 * 
 * See https://stackoverflow.com/a/47914631/1108828
 */
type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
};