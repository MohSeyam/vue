import { defineStore } from 'pinia'
import Dexie from 'dexie'
import type { Table } from 'dexie'
import { ref } from 'vue'
import type { Note } from '@/types/plan'

class NotebookDB extends Dexie {
  notes!: Table<Note, string>
  constructor() {
    super('notebookDB')
    this.version(1).stores({
      notes: 'id,taskId'
    })
  }
}
const db = new NotebookDB()

export const useNotebookStore = defineStore('notebook', () => {
  const notes = ref<Note[]>([])

  async function loadNotes() {
    notes.value = await db.notes.toArray()
  }
  async function addNote(note: Note) {
    note.id = crypto.randomUUID()
    if (!note.taskId) note.taskId = ''
    await db.notes.add(note)
    await loadNotes()
  }
  async function updateNote(note: Note) {
    await db.notes.put(note)
    await loadNotes()
  }
  async function deleteNote(id: string) {
    await db.notes.delete(id)
    await loadNotes()
  }
  function getNotesByTaskId(taskId: string) {
    return notes.value.filter(n => n.taskId && n.taskId === taskId)
  }

  loadNotes()

  return { notes, loadNotes, addNote, updateNote, deleteNote, getNotesByTaskId }
})