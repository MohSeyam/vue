// أداة بحث فوري باستخدام Fuse.js
import Fuse from 'fuse.js'

export function createFuse(data: any[], keys: string[]) {
  return new Fuse(data, { keys, threshold: 0.3 })
}