<template>
  <div class="p-4 bg-white dark:bg-gray-800 rounded shadow max-w-lg mx-auto">
    <canvas ref="canvas" width="400" height="300" class="border mb-2 bg-white dark:bg-gray-700" @mousedown="startDraw" @mousemove="draw" @mouseup="endDraw" @mouseleave="endDraw"
      @touchstart.prevent="startDrawTouch" @touchmove.prevent="drawTouch" @touchend.prevent="endDraw" />
    <div class="flex gap-2 justify-end">
      <button @click="clearCanvas" class="px-3 py-1 bg-gray-400 text-white rounded">Clear</button>
      <button @click="emitSave" class="px-3 py-1 bg-blue-500 text-white rounded">Save</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const canvas = ref<HTMLCanvasElement|null>(null);
let drawing = false;
let last = { x: 0, y: 0 };

function getPos(e: MouseEvent|TouchEvent) {
  const rect = canvas.value!.getBoundingClientRect();
  let x, y;
  if (e instanceof MouseEvent) {
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;
  } else {
    x = e.touches[0].clientX - rect.left;
    y = e.touches[0].clientY - rect.top;
  }
  return { x, y };
}

function startDraw(e: MouseEvent) {
  drawing = true;
  last = getPos(e);
}
function draw(e: MouseEvent) {
  if (!drawing) return;
  const ctx = canvas.value!.getContext('2d')!;
  ctx.beginPath();
  ctx.moveTo(last.x, last.y);
  const pos = getPos(e);
  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();
  last = pos;
}
function endDraw() {
  drawing = false;
}
function startDrawTouch(e: TouchEvent) {
  drawing = true;
  last = getPos(e);
}
function drawTouch(e: TouchEvent) {
  if (!drawing) return;
  const ctx = canvas.value!.getContext('2d')!;
  ctx.beginPath();
  ctx.moveTo(last.x, last.y);
  const pos = getPos(e);
  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();
  last = pos;
}
function clearCanvas() {
  const ctx = canvas.value!.getContext('2d')!;
  ctx.clearRect(0, 0, canvas.value!.width, canvas.value!.height);
}
function emitSave() {
  const _dataUrl = canvas.value!.toDataURL();
  // You can emit or handle the image data as needed
  // $emit('save', dataUrl);
  alert('Drawing saved! (implement event as needed)');
}
</script>