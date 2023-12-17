import * as assert from 'assert';
import { isFromBarrel } from './is-from-barrel';

describe("isFromBarrel Tests", () => {
  it("should return false when path is ''", () => {
    const path: string = '';
    assert.strictEqual(isFromBarrel(path), false);
  });

  it("should return false when path is '.'", () => {
    const path: string = '.';
    assert.strictEqual(isFromBarrel(path), false);
  });

  it("should return false when path is './'", () => {
    const path: string = './';
    assert.strictEqual(isFromBarrel(path), false);
  });

  it("should return false when path is './some.component.ts'", () => {
    const path: string = './some.component.ts';
    assert.strictEqual(isFromBarrel(path), false);
  });

  it("should return true when path is '../../..'", () => {
    const path: string = '../../..';
    assert.strictEqual(isFromBarrel(path), true);
  });

  it("should return true when path is '..'", () => {
    const path: string = '..';
    assert.strictEqual(isFromBarrel(path), true);
  });
});