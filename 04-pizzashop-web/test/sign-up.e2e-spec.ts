import { expect, test } from '@playwright/test'

test('sign up successfully', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  const email = 'test@email.com'

  await page.getByLabel('Nome do estabelecimento').fill('Pizza Shop')
  await page.getByLabel('Seu nome').fill('Marion Robinson')
  await page.getByLabel('Seu e-mail').fill(email)
  await page.getByLabel('Seu celular').fill('14558745211')

  await page.getByRole('button', { name: 'Finalizar cadastro' }).click()

  const toast = page.getByText('Restaurante cadastrado com sucesso!')

  expect(toast).toBeVisible()
})

test('sign up with error', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  const email = 'test@email.com'

  await page.getByLabel('Nome do estabelecimento').fill('Invalid name')
  await page.getByLabel('Seu nome').fill('Marion Robinson')
  await page.getByLabel('Seu e-mail').fill(email)
  await page.getByLabel('Seu celular').fill('14558745211')

  await page.getByRole('button', { name: 'Finalizar cadastro' }).click()

  const toast = page.getByText('Erro ao cadastrar restaurante')

  expect(toast).toBeVisible()
})

test('navigate to login page', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByRole('link', { name: 'Fazer login' }).click()

  expect(page.url()).toContain('/sign-in')
})
