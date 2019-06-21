import { Injectable } from '@angular/core';

@Injectable()
export class Storage {

    constructor() {}

public set(key, value) {
    localStorage.setItem(key, value)
}

public get(key:string) {
return localStorage.getItem(key)
}

public getByKey(index:number) {
    localStorage.key(index)
}

public remove(key:string) {
    localStorage.removeItem(key)
}   

public has(key:string): boolean {
    return !!localStorage.getItem(key)
}

public isEmpty(): boolean {
return !!localStorage.length;
}

public length():number {
    return localStorage.length;
}

public clear() {
    localStorage.clear()
}



}