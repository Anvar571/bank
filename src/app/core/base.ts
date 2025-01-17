
export class BaseClass<T> {
    protected data: T;

    constructor(data: T) {
        this.data = data;
    }

    public get value(): T {
        return this.data;
    }
}