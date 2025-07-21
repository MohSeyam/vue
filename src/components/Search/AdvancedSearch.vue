<template>
  <div class="relative">
    <!-- Search Input -->
    <div class="relative">
      <input
        v-model="searchQuery"
        @input="handleSearch"
        @focus="showSuggestions = true"
        @blur="handleBlur"
        type="text"
        placeholder="البحث في المهام، الملاحظات، المهارات..."
        class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
      />
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <span class="text-gray-400">🔍</span>
      </div>
      <button
        v-if="searchQuery"
        @click="clearSearch"
        class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
      >
        ✕
      </button>
    </div>

    <!-- Search Filters -->
    <div v-if="showFilters" class="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">فلاتر البحث</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Category Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">الفئة</label>
          <select
            v-model="filters.category"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">جميع الفئات</option>
            <option value="network">أمن الشبكات</option>
            <option value="web">أمن الويب</option>
            <option value="forensics">التحليل الجنائي</option>
            <option value="crypto">التشفير</option>
          </select>
        </div>

        <!-- Status Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">الحالة</label>
          <select
            v-model="filters.status"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">جميع الحالات</option>
            <option value="completed">مكتمل</option>
            <option value="in-progress">قيد التنفيذ</option>
            <option value="pending">معلق</option>
          </select>
        </div>

        <!-- Date Range Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">التاريخ</label>
          <select
            v-model="filters.dateRange"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">جميع الأوقات</option>
            <option value="today">اليوم</option>
            <option value="week">هذا الأسبوع</option>
            <option value="month">هذا الشهر</option>
            <option value="year">هذا العام</option>
          </select>
        </div>
      </div>

      <!-- Filter Actions -->
      <div class="flex items-center justify-between mt-4">
        <button
          @click="applyFilters"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          تطبيق الفلاتر
        </button>
        <button
          @click="clearFilters"
          class="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
        >
          مسح الفلاتر
        </button>
      </div>
    </div>

    <!-- Search Suggestions -->
    <div
      v-if="showSuggestions && (searchSuggestions.length > 0 || recentSearches.length > 0)"
      class="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto"
    >
      <!-- Recent Searches -->
      <div v-if="recentSearches.length > 0 && !searchQuery" class="p-3 border-b border-gray-200 dark:border-gray-700">
        <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">البحث الأخير</h4>
        <div class="space-y-1">
          <div
            v-for="search in recentSearches"
            :key="search"
            @click="selectSearch(search)"
            class="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer"
          >
            <span class="text-sm text-gray-600 dark:text-gray-400">{{ search }}</span>
            <button
              @click.stop="removeRecentSearch(search)"
              class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              ✕
            </button>
          </div>
        </div>
      </div>

      <!-- Search Suggestions -->
      <div v-if="searchSuggestions.length > 0" class="p-3">
        <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">الاقتراحات</h4>
        <div class="space-y-1">
          <div
            v-for="suggestion in searchSuggestions"
            :key="suggestion.id"
            @click="selectSuggestion(suggestion)"
            class="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer"
          >
            <span class="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs mr-3"
                  :class="getSuggestionIconClass(suggestion.type)">
              {{ getSuggestionIcon(suggestion.type) }}
            </span>
            <div class="flex-1">
              <div class="text-sm font-medium text-gray-900 dark:text-white">{{ suggestion.title }}</div>
              <div class="text-xs text-gray-500 dark:text-gray-400">{{ suggestion.description }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Search Results -->
    <div v-if="searchResults.length > 0" class="mt-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          نتائج البحث ({{ searchResults.length }})
        </h3>
        <button
          @click="toggleFilters"
          class="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
        >
          {{ showFilters ? 'إخفاء الفلاتر' : 'إظهار الفلاتر' }}
        </button>
      </div>

      <div class="space-y-4">
        <div
          v-for="result in searchResults"
          :key="result.id"
          class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow"
        >
          <div class="flex items-start justify-between">
            <div class="flex items-start space-x-3">
              <span class="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm"
                    :class="getSuggestionIconClass(result.type)">
                {{ getSuggestionIcon(result.type) }}
              </span>
              <div>
                <h4 class="text-sm font-medium text-gray-900 dark:text-white">{{ result.title }}</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">{{ result.description }}</p>
                <div class="flex items-center space-x-4 mt-2">
                  <span class="text-xs text-gray-500 dark:text-gray-400">{{ result.category }}</span>
                  <span class="text-xs text-gray-500 dark:text-gray-400">{{ result.date }}</span>
                </div>
              </div>
            </div>
            <button
              @click="viewResult(result)"
              class="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
            >
              عرض
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';

interface SearchSuggestion {
  id: number;
  type: 'task' | 'note' | 'skill' | 'achievement';
  title: string;
  description: string;
}

interface SearchResult {
  id: number;
  type: 'task' | 'note' | 'skill' | 'achievement';
  title: string;
  description: string;
  category: string;
  date: string;
}

const searchQuery = ref('');
const showSuggestions = ref(false);
const showFilters = ref(false);
const searchResults = ref<SearchResult[]>([]);

const filters = reactive({
  category: '',
  status: '',
  dateRange: ''
});

const recentSearches = ref(['أمن الشبكات', 'التشفير', 'التحليل الجنائي']);

const searchSuggestions = computed(() => {
  if (!searchQuery.value) return [];
  
  // Mock suggestions based on search query
  return [
    {
      id: 1,
      type: 'task' as const,
      title: 'مقدمة في أمن الشبكات',
      description: 'تعلم أساسيات أمن الشبكات'
    },
    {
      id: 2,
      type: 'note' as const,
      title: 'ملاحظات التشفير',
      description: 'ملاحظات حول خوارزميات التشفير'
    },
    {
      id: 3,
      type: 'skill' as const,
      title: 'مهارة أمن الويب',
      description: 'مستوى متقدم في أمن الويب'
    }
  ].filter(item => 
    item.title.includes(searchQuery.value) || 
    item.description.includes(searchQuery.value)
  );
});

function handleSearch() {
  if (searchQuery.value.length > 2) {
    // Simulate search
    searchResults.value = [
      {
        id: 1,
        type: 'task',
        title: 'مقدمة في أمن الشبكات',
        description: 'تعلم أساسيات أمن الشبكات والحماية',
        category: 'أمن الشبكات',
        date: '2024-01-15'
      },
      {
        id: 2,
        type: 'note',
        title: 'ملاحظات التشفير',
        description: 'ملاحظات حول خوارزميات التشفير المتقدمة',
        category: 'التشفير',
        date: '2024-01-14'
      }
    ];
  } else {
    searchResults.value = [];
  }
}

function handleBlur() {
  setTimeout(() => {
    showSuggestions.value = false;
  }, 200);
}

function clearSearch() {
  searchQuery.value = '';
  searchResults.value = [];
}

function selectSearch(search: string) {
  searchQuery.value = search;
  handleSearch();
}

function selectSuggestion(suggestion: SearchSuggestion) {
  searchQuery.value = suggestion.title;
  handleSearch();
  showSuggestions.value = false;
}

function removeRecentSearch(search: string) {
  recentSearches.value = recentSearches.value.filter(s => s !== search);
}

function toggleFilters() {
  showFilters.value = !showFilters.value;
}

function applyFilters() {
  // TODO: Apply filters to search results
  console.log('Applying filters:', filters);
}

function clearFilters() {
  filters.category = '';
  filters.status = '';
  filters.dateRange = '';
}

function viewResult(result: SearchResult) {
  // TODO: Navigate to result detail page
  console.log('Viewing result:', result);
}

function getSuggestionIcon(type: string): string {
  const icons = {
    task: '📋',
    note: '📝',
    skill: '🎯',
    achievement: '🏆'
  };
  return icons[type as keyof typeof icons] || '📄';
}

function getSuggestionIconClass(type: string): string {
  const classes = {
    task: 'bg-blue-500',
    note: 'bg-green-500',
    skill: 'bg-purple-500',
    achievement: 'bg-yellow-500'
  };
  return classes[type as keyof typeof classes] || 'bg-gray-500';
}
</script>