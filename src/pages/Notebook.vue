<template>
  <div class="p-8 max-w-3xl mx-auto">
    <h1 class="text-3xl font-bold mb-4 text-center">Notebook</h1>
    <div class="mb-6 flex justify-end">
      <ExportButtons @export-pdf="exportPDF" @export-md="exportMD" />
    </div>
    <div class="mb-8">
      <NoteEditor :note="editingNote" v-if="editing" @save="saveNote" @cancel="cancelEdit" />
      <button v-else @click="startNewNote" class="mb-4 px-4 py-2 bg-blue-500 text-white rounded">New Note</button>
    </div>
    <div class="mb-8">
      <h2 class="text-xl font-bold mb-2">Notes</h2>
      <NoteCard v-for="note in notes" :key="note.id" :note="note" @edit="editNote" @delete="deleteNote" @export="exportNote" />
    </div>
    <div class="mb-8">
      <h2 class="text-xl font-bold mb-2">Drawing Board</h2>
      <DrawingBoard />
    </div>
  </div>
</template>

<script setup lang="ts">
import NoteEditor from '@/components/NoteEditor.vue';
import NoteCard from '@/components/NoteCard.vue';
import DrawingBoard from '@/components/DrawingBoard.vue';
import ExportButtons from '@/components/ExportButtons.vue';
import { ref } from 'vue';

const notes = ref([
  { id: 1, title: 'First Note', content: 'This is a **markdown** note.', tags: ['cyber', 'plan'], type: 'Task' },
  { id: 2, title: 'Reflection', content: 'Today I learned about XSS.', tags: ['reflection'], type: 'Journal' }
]);
const editing = ref(false);
const editingNote = ref({ title: '', content: '', tags: [], type: 'Task' });

function startNewNote() {
  editing.value = true;
  editingNote.value = { title: '', content: '', tags: [], type: 'Task' };
}
function saveNote(note: any) {
  if (!note.id) note.id = Date.now();
  notes.value.push({ ...note, type: 'Task' });
  editing.value = false;
}
function cancelEdit() {
  editing.value = false;
}
function editNote(note: any) {
  editing.value = true;
  editingNote.value = { ...note };
}
function deleteNote(note: any) {
  notes.value = notes.value.filter(n => n.id !== note.id);
}
function exportNote(note: any) {
  alert('Export note: ' + note.title);
}
function exportPDF() {
  alert('Export all notes as PDF!');
}
function exportMD() {
  alert('Export all notes as Markdown!');
}
</script>