<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  variant: { type: String, default: 'primary' }, // primary | secondary | accent | ghost | danger
  size: { type: String, default: 'md' },          // sm | md | lg
  to: { type: [String, Object], default: null },
  href: { type: String, default: null },
  type: { type: String, default: 'button' },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  block: { type: Boolean, default: false },
})

const base =
  'inline-flex items-center justify-center gap-2 font-display font-semibold rounded-full ' +
  'transition-all duration-150 select-none ' +
  'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky/60 ' +
  'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none'

const variants = {
  primary:   'bg-leaf text-white shadow-sm hover:bg-[#3f9450] active:translate-y-[1px]',
  secondary: 'bg-white text-forest border-2 border-forest/15 hover:border-forest/40',
  accent:    'bg-orange text-white shadow-sm hover:brightness-95 active:translate-y-[1px]',
  ghost:     'bg-transparent text-forest hover:bg-forest/5',
  danger:    'bg-coral text-white shadow-sm hover:brightness-95',
}

const sizes = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-base',   // 44px — §11.9 touch target
  lg: 'h-13 px-8 text-lg',
}

const classes = computed(() => [
  base,
  variants[props.variant] ?? variants.primary,
  sizes[props.size] ?? sizes.md,
  props.block ? 'w-full' : '',
])

const isDisabled = computed(() => props.disabled || props.loading)
</script>

<template>
  <RouterLink v-if="to && !isDisabled" :to="to" :class="classes">
    <slot />
  </RouterLink>
  <a v-else-if="href && !isDisabled" :href="href" :class="classes">
    <slot />
  </a>
  <button v-else :type="type" :disabled="isDisabled" :class="classes">
    <svg v-if="loading" class="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" opacity="0.25" />
      <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
    </svg>
    <slot />
  </button>
</template>