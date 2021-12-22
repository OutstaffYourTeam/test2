import { Entity } from './base';

export interface ObjectInterface extends Entity {
    title?: string,
    color: string,
    width: number,
    height: number,
    depth: number,
}   