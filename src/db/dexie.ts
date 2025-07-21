import Dexie, { Table } from 'dexie'

// قاعدة بيانات محلية باستخدام Dexie.js
export class CyberPlanDB extends Dexie {
  notes!: Table<any>
  journal!: Table<any>
  plan!: Table<any>
  achievements!: Table<any>
  constructor() {
    super('CyberPlanDB')
    this.version(1).stores({
      notes: '++id, title, tags',
      journal: '++id, date, tags',
      plan: 'id',
      achievements: '++id, type'
    })
  }
}

export const db = new CyberPlanDB()