import * as assert from 'assert';
import { isFromBarrelSameLevel } from './is-from-barrel-same-level';

describe("isFromBarrelSameLevel Tests", () => {
  it("should return false when path is ''", () => {
    const path: string = '';
    assert.strictEqual(isFromBarrelSameLevel(path), false);
  });
  
  it("should return false when path is '.'", () => {
    const path: string = '.';
    assert.strictEqual(isFromBarrelSameLevel(path), false);
  });
  
  it("should return false when path is './'", () => {
    const path: string = './';
    assert.strictEqual(isFromBarrelSameLevel(path), false);
  });
  
  it("should return false when path is './some.component.ts'", () => {
    const path: string = './some.component.ts';
    assert.strictEqual(isFromBarrelSameLevel(path), false);
  });
  
  it("should return false when path is '../../..'", () => {
    const path: string = '../../..';
    assert.strictEqual(isFromBarrelSameLevel(path), false);
  });
  
  it("should return true when path is '..'", () => {
    const path: string = '..';
    assert.strictEqual(isFromBarrelSameLevel(path), true);
  });
});
