<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <footer class="mt-16 bg-forest text-cream/90">
    <div class="max-w-6xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-4">
      <div>
        <div class="font-display font-bold text-xl text-white">Kijiji Adventures</div>
        <p class="mt-2 text-sm text-cream/70">Play. Create. Explore. Discover.</p>
      </div>
      <div>
        <div class="font-display font-semibold mb-2 text-white">Explore</div>
        <ul class="space-y-1 text-sm">
          <li><RouterLink to="/play" class="hover:text-white">Play Zone</RouterLink></li>
          <li><RouterLink to="/shop" class="hover:text-white">Shop</RouterLink></li>
          <li><RouterLink to="/experiences" class="hover:text-white">Experiences</RouterLink></li>
        </ul>
      </div>
      <div>
        <div class="font-display font-semibold mb-2 text-white">Account</div>
        <ul class="space-y-1 text-sm">
          <li><RouterLink to="/progress" class="hover:text-white">My Progress</RouterLink></li>
          <li><RouterLink to="/parent" class="hover:text-white">Parent Area</RouterLink></li>
          <li><RouterLink to="/cart" class="hover:text-white">Cart</RouterLink></li>
        </ul>
      </div>
      <div>
        <div class="font-display font-semibold mb-2 text-white">Support</div>
        <ul class="space-y-1 text-sm">
          <li><RouterLink to="/about" class="hover:text-white">About</RouterLink></li>
          <li><RouterLink to="/contact" class="hover:text-white">Contact</RouterLink></li>
          <li><RouterLink to="/policies" class="hover:text-white">Policies & safety</RouterLink></li>
        </ul>
      </div>
    </div>
    <div class="border-t border-cream/10">
      <div class="max-w-6xl mx-auto px-4 py-4 text-xs text-cream/60">
        © Kijiji Adventures. Prototype for HCI coursework.
      </div>
    </div>
  </footer>
</template>