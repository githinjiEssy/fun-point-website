<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppButton from '../../components/ui/AppButton.vue'
import { getActivity } from '../../stores/activities'
import { useProgressStore } from '../../stores/progress'
import { useToastStore } from '../../stores/toast'

const route = useRoute()
const router = useRouter()
const progress = useProgressStore()
const toast = useToastStore()

const activity = computed(() => getActivity(route.params.activityId))

// --- Generic stub for activities we haven't built yet ---
const isMatchGame = computed(() => activity.value?.id === 'savannah-match')

// --- Savannah Match ---
// Each card: { id, matchId, emoji, label, matched, wrong, selected }
const animals = [
  { matchId: 'lion',   emoji: '🦁', label: 'Lion' },
  { matchId: 'elephant', emoji: '🐘', label: 'Elephant' },
  { matchId: 'giraffe',  emoji: '🦒', label: 'Giraffe' },
  { matchId: 'zebra',    emoji: '🦓', label: 'Zebra' },
  { matchId: 'rhino',    emoji: '🦏', label: 'Rhino' },
  { matchId: 'cheetah',  emoji: '🐆', label: 'Cheetah' },
]

// Homes matched to animals
const homes = [
  { matchId: 'lion',    emoji: '🌾', label: 'Grassland' },
  { matchId: 'elephant',emoji: '🌳', label: 'Savannah trees' },
  { matchId: 'giraffe', emoji: '🌿', label: 'Acacia grove' },
  { matchId: 'zebra',   emoji: '🌾', label: 'Open plains' },
  { matchId: 'rhino',   emoji: '🌳', label: 'Bushland' },
  { matchId: 'cheetah', emoji: '🌾', label: 'Grassland' },
]

// For the pairing demo we use the animal's matchId to match a specific "home" card.
// To make it a real matching puzzle we use unique emoji-based "habitat" that clearly pairs:
const pairs = [
  { matchId: 'lion',    left: '🦁', leftLabel: 'Lion',    right: '🌾', rightLabel: 'Grassland' },
  { matchId: 'elephant',left: '🐘', leftLabel: 'Elephant',right: '🌳', rightLabel: 'Trees' },
  { matchId: 'giraffe', left: '🦒', leftLabel: 'Giraffe', right: '🌿', rightLabel: 'Acacia' },
  { matchId: 'zebra',   left: '🦓', leftLabel: 'Zebra',   right: '🪶', rightLabel: 'Plains' },
]

const cards = ref([])
const selected = ref(null)
const matchedCount = ref(0)
const attempts = ref(0)
const finished = ref(false)
const feedback = ref('')
const lockInput = ref(false)

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}

function buildCards() {
  const left = pairs.map((p) => ({
    id: `l-${p.matchId}`,
    matchId: p.matchId,
    emoji: p.left,
    label: p.leftLabel,
    matched: false,
    wrong: false,
  }))
  const right = pairs.map((p) => ({
    id: `r-${p.matchId}`,
    matchId: p.matchId,
    emoji: p.right,
    label: p.rightLabel,
    matched: false,
    wrong: false,
  }))
  cards.value = shuffle([...left, ...right])
}

function reset() {
  selected.value = null
  matchedCount.value = 0
  attempts.value = 0
  finished.value = false
  feedback.value = ''
  lockInput.value = false
  buildCards()
}

function select(card) {
  if (lockInput.value || card.matched || card.wrong) return
  if (selected.value?.id === card.id) {
    selected.value = null
    return
  }
  if (!selected.value) {
    selected.value = card
    feedback.value = `Selected ${card.label}. Now pick its match.`
    return
  }
  // Attempt a match
  attempts.value++
  const a = selected.value
  const b = card
  if (a.matchId === b.matchId && a.id[0] !== b.id[0]) {
    a.matched = true
    b.matched = true
    matchedCount.value++
    selected.value = null
    feedback.value = `Nice! ${a.label} matched.`
    if (matchedCount.value === pairs.length) {
      completeGame()
    }
  } else {
    lockInput.value = true
    a.wrong = true
    b.wrong = true
    feedback.value = `Not a match. Try again.`
    setTimeout(() => {
      a.wrong = false
      b.wrong = false
      selected.value = null
      lockInput.value = false
    }, 650)
  }
}

function completeGame() {
  finished.value = true
  const xp = activity.value?.xp ?? 30
  progress.complete(activity.value.id, xp)
  toast.push(`Activity complete! +${xp} XP`, { tone: 'sun' })
}

onMounted(() => {
  if (!activity.value) return
  if (isMatchGame.value) {
    buildCards()
  } else {
    // Stub flow for other activities: allow direct completion
    // (We'll flesh out each activity in later steps.)
  }
})

function finishStub() {
  progress.complete(activity.value.id, activity.value.xp)
  toast.push(`Activity complete! +${activity.value.xp} XP`, { tone: 'sun' })
  finished.value = true
}
</script>

<template>
  <main class="min-h-screen bg-cream">
    <div v-if="!activity" class="max-w-lg mx-auto p-8 text-center">
      <p>Activity not found.</p>
      <AppButton to="/play" class="mt-4">Back to Play Zone</AppButton>
    </div>

    <div v-else class="max-w-3xl mx-auto px-4 py-6">
      <!-- Top bar -->
      <div class="flex items-center justify-between mb-4">
        <button
          type="button"
          class="text-sm font-semibold text-forest/70 hover:text-forest"
          @click="router.push('/play')"
        >
          ← Exit
        </button>
        <div class="font-display font-semibold text-forest">{{ activity.title }}</div>
        <div class="w-12 text-right text-sm font-bold text-forest/70">
          {{ matchedCount }}/{{ isMatchGame ? pairs.length : 0 }}
        </div>
      </div>

      <!-- Savannah Match game -->
      <section v-if="isMatchGame && !finished" aria-label="Savannah Match game">
        <p class="text-brown/70 text-sm mb-4 text-center">
          Match each animal with its savannah habitat.
        </p>

        <div class="grid grid-cols-3 sm:grid-cols-4 gap-3">
          <button
            v-for="card in cards"
            :key="card.id"
            type="button"
            class="aspect-square rounded-2xl border-2 grid place-items-center text-5xl transition-all duration-150 select-none"
            :class="[
              card.matched
                ? 'bg-leaf/20 border-leaf/60 cursor-default'
                : card.wrong
                  ? 'bg-coral/20 border-coral animate-[shake_0.4s_ease]'
                  : selected?.id === card.id
                    ? 'bg-sun/40 border-sun -translate-y-1 shadow-md'
                    : 'bg-white border-forest/10 hover:border-forest/40 hover:-translate-y-0.5',
            ]"
            :aria-label="`${card.label}${card.matched ? ', matched' : ''}`"
            :disabled="card.matched || lockInput"
            @click="select(card)"
          >
            <span aria-hidden="true">{{ card.emoji }}</span>
          </button>
        </div>

        <!-- Live region for feedback -->
        <div class="mt-6 min-h-8 text-center" aria-live="polite">
          <p class="text-forest/70 font-semibold">{{ feedback }}</p>
        </div>

        <div class="mt-4 flex justify-center">
          <AppButton variant="ghost" size="sm" @click="reset">Restart</AppButton>
        </div>
      </section>

      <!-- Stub for not-yet-implemented activities -->
      <section v-else-if="!finished" class="text-center py-16">
        <div class="text-8xl mb-4" aria-hidden="true">{{ activity.emoji }}</div>
        <h2 class="text-2xl">This activity is coming soon</h2>
        <p class="text-brown/70 mt-2 max-w-md mx-auto">
          We're building {{ activity.title }} step by step. For now, you can mark it as explored
          to test the progress flow.
        </p>
        <AppButton class="mt-6" @click="finishStub">Mark as explored</AppButton>
      </section>

      <!-- Completion state -->
      <section v-else class="text-center py-10">
        <div class="text-8xl mb-4 animate-bounce" aria-hidden="true">🏆</div>
        <h2 class="text-3xl">Adventure complete!</h2>
        <p class="text-brown/70 mt-2">
          You earned <strong class="text-forest">+{{ activity.xp }} XP</strong> for {{ activity.title }}.
        </p>

        <div class="mt-6 rounded-2xl bg-white border border-forest/10 p-5 max-w-sm mx-auto">
          <div class="text-sm text-brown/60 font-semibold">Total XP</div>
          <div class="font-display text-4xl text-forest">{{ progress.totalXp }}</div>
          <div class="mt-3 flex flex-wrap justify-center gap-1 text-2xl">
            <span v-for="b in progress.badges" :key="b.id" :title="b.label">{{ b.emoji }}</span>
          </div>
        </div>

        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <AppButton to="/play" variant="primary">Back to Play Zone</AppButton>
          <AppButton to="/progress" variant="secondary">See my progress</AppButton>
        </div>
      </section>
    </div>
  </main>
</template>

<style>
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}
</style>