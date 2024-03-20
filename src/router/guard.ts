import type { Router } from 'vue-router'

export function guard(router: Router) {
  router.beforeEach(async (to, from) => {})
}
