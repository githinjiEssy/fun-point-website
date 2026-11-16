<script setup>
import { computed } from 'vue'
import AppButton from '../components/ui/AppButton.vue'
import ActivityCard from '../components/cards/ActivityCard.vue'
import ProductCard from '../components/cards/ProductCard.vue'
import ExperienceCard from '../components/cards/ExperienceCard.vue'
import { activities } from '../stores/activities'
import { products } from '../stores/products'
import { experiences } from '../stores/experiences'
import { useProgressStore } from '../stores/progress'

const progress = useProgressStore()

const featuredActivities = computed(() => activities.slice(0, 3))
const featuredProducts = computed(() => products.slice(0, 3))
const featuredExperiences = computed(() => experiences.slice(0, 2))
const continueActivity = computed(() => {
  const inProgress = activities.find((a) => !progress.isComplete(a.id))
  return inProgress ?? activities[0]
})
</script>

<template>
  <main>
    <!-- Hero -->
    <section class="relative overflow-hidden mb-12">
      <!-- Background image -->
      <div class="absolute inset-0">
        <img
          src="../assets/images/hero-kids.jpg"
          alt=""
          class="w-full h-full object-cover"
          fetchpriority="high"
          decoding="async"
        />
        <!-- Cream scrim: strong on left for text contrast, fades to transparent on right -->
        <div class="absolute inset-0 bg-gradient-to-r from-cream via-cream/95 to-cream/20 md:to-transparent"></div>
        <!-- Mobile: stronger bottom fade so text is readable when stacked -->
        <div class="absolute inset-0 bg-gradient-to-t from-cream via-transparent to-transparent md:hidden"></div>
      </div>

      <div class="relative max-w-6xl mx-auto px-4 pt-10 pb-14 md:pt-16 md:pb-24 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <span class="inline-flex items-center gap-2 rounded-full bg-sun/40 backdrop-blur-sm text-forest font-display font-semibold px-4 py-1 text-sm">
            🌍 Play. Create. Explore. Discover.
          </span>
          <h1 class="text-4xl md:text-5xl mt-4 leading-tight">
            Welcome to <span class="text-leaf">Kijiji Adventures</span>
          </h1>
          <p class="text-lg text-brown/80 mt-4 max-w-md">
            Games, crafts, and real adventures for explorers aged 8–12. Pick a trail, earn badges, and see how far you can go.
          </p>
          <div class="flex flex-wrap gap-3 mt-6">
            <AppButton to="/play" size="lg" variant="primary">Start playing</AppButton>
            <AppButton to="/experiences" size="lg" variant="secondary">See experiences</AppButton>
          </div>
          <p v-if="progress.completedCount > 0" class="mt-4 text-sm text-forest/80">
            Welcome back! You've earned <strong>{{ progress.totalXP }} XP</strong> across {{ progress.completedCount }} activities.
          </p>
        </div>
        <!-- Empty right column on md+ so the photo shows through -->
        <div class="hidden md:block" aria-hidden="true"></div>
      </div>
    </section>

    <!-- Continue playing -->
    <section v-if="continueActivity" class="max-w-6xl mx-auto px-4">
      <div class="rounded-2xl bg-forest text-cream p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-4">
        <span class="text-5xl">{{ continueActivity.emoji }}</span>
        <div class="flex-1">
          <div class="text-cream/70 text-sm font-semibold">Continue your adventure</div>
          <h2 class="text-2xl text-white font-display">{{ continueActivity.title }}</h2>
          <p class="text-cream/80 text-sm mt-1">{{ continueActivity.summary }}</p>
        </div>
        <AppButton :to="`/play/${continueActivity.id}`" variant="accent" size="lg">Resume</AppButton>
      </div>
    </section>

    <!-- Featured activities -->
    <section class="max-w-6xl mx-auto px-4 mt-14">
      <div class="flex items-end justify-between mb-4">
        <div>
          <h2 class="text-2xl">Play Zone</h2>
          <p class="text-brown/70 text-sm">Games and challenges to jump into right now.</p>
        </div>
        <AppButton to="/play" variant="ghost" size="sm">See all →</AppButton>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <ActivityCard v-for="a in featuredActivities" :key="a.id" :activity="a" />
      </div>
    </section>

    <!-- Featured products -->
    <section class="max-w-6xl mx-auto px-4 mt-14">
      <div class="flex items-end justify-between mb-4">
        <div>
          <h2 class="text-2xl">Adventure Shop</h2>
          <p class="text-brown/70 text-sm">Kits and goodies to take your adventures further.</p>
        </div>
        <AppButton to="/shop" variant="ghost" size="sm">See all →</AppButton>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <ProductCard v-for="p in featuredProducts" :key="p.id" :product="p" />
      </div>
    </section>

    <!-- Featured experiences -->
    <section class="max-w-6xl mx-auto px-4 mt-14">
      <div class="flex items-end justify-between mb-4">
        <div>
          <h2 class="text-2xl">Experiences</h2>
          <p class="text-brown/70 text-sm">Workshops, birthdays and holiday programmes.</p>
        </div>
        <AppButton to="/experiences" variant="ghost" size="sm">See all →</AppButton>
      </div>
      <div class="grid sm:grid-cols-2 gap-5">
        <ExperienceCard v-for="e in featuredExperiences" :key="e.id" :experience="e" />
      </div>
    </section>

    <!-- Parent call-out -->
    <section class="max-w-6xl mx-auto px-4 mt-14 mb-4">
      <div class="rounded-2xl bg-white border border-forest/10 p-6 md:p-8 flex flex-col md:flex-row gap-4 md:items-center">
        <div class="flex-1">
          <h2 class="text-xl">For parents and guardians</h2>
          <p class="text-brown/70 text-sm mt-1">
            Review purchases, manage bookings, and check activity settings in one place.
          </p>
        </div>
        <AppButton to="/parent" variant="secondary">Open Parent Area</AppButton>
      </div>
    </section>
  </main>
</template>