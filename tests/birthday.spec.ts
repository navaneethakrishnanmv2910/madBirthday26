import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  page.on('pageerror', error => { throw error })
  await page.goto('/')
})

test('opens all eight chapters and navigates with the accessible menu', async ({ page }) => {
  await expect(page).toHaveTitle(/Madhumitha/)
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Pondatii')
  await expect(page.locator('main > section')).toHaveCount(8)
  await page.getByRole('button', { name: 'Open chapters' }).click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.getByRole('navigation', { name: 'Birthday chapters' }).getByRole('link', { name: /21 little things/ }).click()
  await expect(page).toHaveURL(/#notes$/)
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Open note 1', exact: true })).toBeInViewport()
})

test('photo album shows every photo, supports keyboard navigation and restores focus', async ({ page }) => {
  const photo = page.getByRole('button', { name: 'Open photo 1:', exact: false })
  await photo.click()
  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()
  await expect(dialog.getByRole('heading')).toHaveText('My favourite kind of together.')
  await page.keyboard.press('ArrowRight')
  await expect(dialog.getByRole('heading')).toHaveText('A little closer.')
  await page.keyboard.press('ArrowLeft')
  await page.keyboard.press('ArrowLeft')
  await expect(dialog.getByRole('heading')).toHaveText('One more, because it is you.')
  await expect(dialog.locator('img')).toHaveAttribute('src', '/photos/memory-12.webp')
  await page.keyboard.press('Escape')
  await expect(dialog).toHaveCount(0)
  await expect(photo).toBeFocused()
})

test('a choice-based conversation responds and reaches its conclusion', async ({ page }) => {
  await page.getByRole('button', { name: 'Konjam emotional' }).click()
  await expect(page.locator('.chat-answer')).toContainText('Parava illa')
  await page.getByRole('button', { name: 'Keep talking' }).click()
  await page.getByRole('button', { name: 'Just sit beside me' }).click()
  await expect(page.locator('.chat-answer')).toContainText('being next to you')
  await page.getByRole('button', { name: 'Keep talking' }).click()
  await page.getByRole('button', { name: 'Time for my dreams' }).click()
  await page.getByRole('button', { name: 'That sounds lovely' }).click()
  await expect(page.getByRole('heading', { name: 'Okay, birthday girl.' })).toBeVisible()
  await page.getByRole('link', { name: 'Show me', exact: true }).click()
  await expect(page).toHaveURL(/#notes$/)
})

test('all 21 notes reveal and opened notes persist after refreshing', async ({ page }) => {
  for (let i = 1; i <= 21; i++) await page.getByRole('button', { name: `Open note ${i}`, exact: true }).click()
  await expect(page.locator('.notes-count > span')).toHaveText('21')
  await expect(page.locator('.opened-note h3')).toHaveText('And this, always.')
  await page.reload()
  await expect(page.locator('.notes-count > span')).toHaveText('21')
  await page.getByRole('button', { name: 'Open note 1, already read', exact: true }).click()
  await expect(page.locator('.opened-note h3')).toHaveText('Your smile.')
})

test('memory game rejects mismatches, completes six pairs, and resets', async ({ page }) => {
  const cards = page.locator('.memory-card')
  const firstPair = await cards.first().getAttribute('data-pair')
  const otherCard = page.locator(`.memory-card:not([data-pair="${firstPair}"])`).first()
  await cards.first().click()
  await otherCard.click()
  await expect(page.locator('.game-feedback')).toContainText('Not quite')
  await expect(page.locator('.memory-card.flipped')).toHaveCount(0, { timeout: 4000 })
  for (const pair of ['1', '2', '3', '8', '9', '10']) {
    const matching = page.locator(`.memory-card[data-pair="${pair}"]`)
    await matching.nth(0).click()
    await matching.nth(1).click()
  }
  await expect(page.locator('.memory-card.matched')).toHaveCount(12)
  await expect(page.locator('.game-feedback')).toContainText('All six pairs')
  await page.getByRole('button', { name: 'Mix them again' }).click()
  await expect(page.locator('.memory-card.matched')).toHaveCount(0)
  await expect(page.locator('.game-score')).toContainText('0 / 6')
})

test('sealed letter opens and can be downloaded', async ({ page }) => {
  await page.getByRole('button', { name: 'Break the seal and open your letter' }).click()
  await expect(page.getByRole('article', { name: 'Your birthday letter' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'My dearest Pondatii,' })).toBeVisible()
  const downloadPromise = page.waitForEvent('download')
  await page.getByRole('button', { name: 'Keep this letter' }).click()
  const download = await downloadPromise
  expect(download.suggestedFilename()).toBe('A-letter-for-Madhumitha.txt')
  expect(await download.failure()).toBeNull()
})

test('candles support hold, private wishes persist, and the birthday card downloads', async ({ page }) => {
  const hold = page.getByRole('button', { name: 'Hold to blow out the candles', exact: true })
  await hold.scrollIntoViewIfNeeded()
  await hold.focus()
  await page.keyboard.down('Space')
  await page.waitForTimeout(200)
  await page.keyboard.up('Space')
  await expect(page.locator('.cake-scene')).not.toHaveClass(/candles-out/)
  await hold.focus()
  await page.keyboard.down('Space')
  await expect(page.locator('.cake-scene')).toHaveClass(/candles-out/, { timeout: 4000 })
  await page.keyboard.up('Space')
  await expect(page.getByRole('heading', { name: /Happy 21st birthday/ })).toBeVisible()
  await page.getByLabel('A little wish to keep?').fill('More happy afternoons together.')
  await page.getByRole('button', { name: 'Tuck my wish away' }).click()
  await expect(page.locator('.saved-wish blockquote')).toHaveText('More happy afternoons together.')
  const downloadPromise = page.waitForEvent('download')
  await page.getByRole('button', { name: 'Keep a little birthday card' }).click()
  const download = await downloadPromise
  expect(download.suggestedFilename()).toBe('For-Madhumitha-with-love.png')
  expect(await download.failure()).toBeNull()
  await page.reload()
  await page.getByRole('button', { name: 'Or tap here to make your wish' }).click()
  await expect(page.locator('.saved-wish blockquote')).toHaveText('More happy afternoons together.')
  await page.getByRole('button', { name: 'Let this wish go' }).click()
  await expect(page.getByLabel('A little wish to keep?')).toHaveValue('')
})

test('sound is opt-in and can be turned off', async ({ page }) => {
  await expect(page.getByRole('button', { name: 'Sound off' })).toHaveAttribute('aria-pressed', 'false')
  await page.getByRole('button', { name: 'Sound off' }).click()
  await expect(page.getByRole('button', { name: 'Sound on' })).toHaveAttribute('aria-pressed', 'true')
  await page.getByRole('button', { name: 'Sound on' }).click()
  await expect(page.getByRole('button', { name: 'Sound off' })).toHaveAttribute('aria-pressed', 'false')
})

test('scroll reveals and pointer-held candles work with full animations', async ({ page }, testInfo) => {
  test.setTimeout(60000)
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.reload()
  for (const id of ['today', 'memories', 'us', 'play', 'letter']) {
    const section = page.locator(`#${id}`)
    for (const reveal of await section.locator('[style*="opacity"]').all()) {
      if (!await reveal.isVisible()) continue
      await reveal.scrollIntoViewIfNeeded()
      await expect(reveal).toHaveCSS('opacity', '1')
    }
    await section.screenshot({ path: `test-results/${testInfo.project.name}-${id}.png`, animations: 'disabled' })
  }
  const hold = page.getByRole('button', { name: 'Hold to blow out the candles', exact: true })
  await hold.scrollIntoViewIfNeeded()
  const box = await hold.boundingBox()
  expect(box).not.toBeNull()
  await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height / 2)
  await page.mouse.down()
  await expect(page.locator('.cake-scene')).toHaveClass(/candles-out/, { timeout: 4000 })
  await page.mouse.up()
  await expect(page.locator('.celebration')).toHaveCSS('opacity', '1')
  await page.locator('.celebration-title').scrollIntoViewIfNeeded()
  await page.screenshot({ path: `test-results/${testInfo.project.name}-celebration.png` })
})

test('layouts fit small phones, tablets and laptops without horizontal overflow', async ({ page }, testInfo) => {
  const sizes = testInfo.project.name === 'mobile' ? [320, 390] : [768, 1024, 1440]
  for (const width of sizes) {
    await page.setViewportSize({ width, height: 900 })
    for (const id of ['hello', 'today', 'memories', 'us', 'notes', 'play', 'letter', 'wish']) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded()
      const dimensions = await page.evaluate(() => ({ width: innerWidth, content: document.documentElement.scrollWidth }))
      expect(dimensions.content, `Overflow at ${width}px in ${id}`).toBeLessThanOrEqual(dimensions.width)
    }
  }
  await page.setViewportSize({ width: testInfo.project.name === 'mobile' ? 390 : 1440, height: testInfo.project.name === 'mobile' ? 844 : 1000 })
  await page.goto('/')
  await expect(page.locator('.main-polaroid img')).toBeVisible()
  await expect(page.locator('.main-polaroid')).toHaveCSS('opacity', '1')
  await expect(page.locator('.hero-invitation')).toHaveCSS('opacity', '1')
  await page.screenshot({ path: `test-results/${testInfo.project.name}-cover.png`, fullPage: false })
  await page.locator('#notes').scrollIntoViewIfNeeded()
  await page.getByRole('button', { name: 'Open note 16', exact: true }).click()
  await expect(page.locator('.opened-note h3')).toHaveText('Saying it properly.')
  await page.screenshot({ path: `test-results/${testInfo.project.name}-notes.png`, fullPage: false })
})
