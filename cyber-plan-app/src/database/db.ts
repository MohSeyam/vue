import Dexie from 'dexie';

export class AppDatabase extends Dexie {
  notes: Dexie.Table<any, number>;
  journal: Dexie.Table<any, number>;

  constructor() {
    super('CyberPlanDB');
    this.version(1).stores({
      notes: '++id, title, content, tags, taskId',
      journal: '++id, date, content',
    });
    this.notes = this.table('notes');
    this.journal = this.table('journal');
  }
}

export const db = new AppDatabase();