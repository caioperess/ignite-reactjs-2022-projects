import { expect, test } from '@playwright/test'

test('list orders', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await expect(
    page.getByRole('cell', { name: 'customer-1', exact: true }),
  ).toBeVisible()
  await expect(page.getByRole('cell', { name: 'customer-10' })).toBeVisible()
})

test('paginate orders', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  /* Próxima página */
  await page.getByRole('button', { name: 'Próxima página' }).click()

  await expect(
    page.getByRole('cell', { name: 'customer-11', exact: true }),
  ).toBeVisible()
  await expect(page.getByRole('cell', { name: 'customer-20' })).toBeVisible()

  /* Última página */
  await page.getByRole('button', { name: 'Última página' }).click()

  await expect(
    page.getByRole('cell', { name: 'customer-51', exact: true }),
  ).toBeVisible()
  await expect(page.getByRole('cell', { name: 'customer-60' })).toBeVisible()

  /* Página anterior */
  await page.getByRole('button', { name: 'Página anterior' }).click()

  await expect(
    page.getByRole('cell', { name: 'customer-41', exact: true }),
  ).toBeVisible()
  await expect(page.getByRole('cell', { name: 'customer-50' })).toBeVisible()

  /* Primeira página */
  await page.getByRole('button', { name: 'Primeira página' }).click()

  await expect(
    page.getByRole('cell', { name: 'customer-1', exact: true }),
  ).toBeVisible()
  await expect(page.getByRole('cell', { name: 'customer-10' })).toBeVisible()
})

test('filter by order id', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByPlaceholder('ID do pedido').fill('order-43')
  await page.getByRole('button', { name: 'Filtrar resultados' }).click()

  await expect(page.getByRole('cell', { name: 'order-43' })).toBeVisible()
})

test('filter by customer id', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByPlaceholder('Nome do cliente').fill('customer-43')
  await page.getByRole('button', { name: 'Filtrar resultados' }).click()

  await expect(page.getByRole('cell', { name: 'customer-43' })).toBeVisible()
})

test('filter by order status', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  /* Pending status */
  await page.getByRole('combobox').click()
  await page.getByLabel('Pendente').click()

  await page.getByRole('button', { name: 'Filtrar resultados' }).click()

  const tablePendingRows = await page
    .getByRole('cell', { name: 'Pendente' })
    .all()

  await expect(tablePendingRows).toHaveLength(10)

  /* Canceled status */
  await page.getByRole('combobox').click()
  await page.getByLabel('Cancelado').click()

  await page.getByRole('button', { name: 'Filtrar resultados' }).click()

  const tableCanceledRows = await page
    .getByRole('cell', { name: 'Cancelado' })
    .all()

  await expect(tableCanceledRows).toHaveLength(10)

  /* Processing status */
  await page.getByRole('combobox').click()
  await page.getByLabel('Em preparo').click()

  await page.getByRole('button', { name: 'Filtrar resultados' }).click()

  const tableProcessingRows = await page
    .getByRole('cell', { name: 'Em preparo' })
    .all()

  await expect(tableProcessingRows).toHaveLength(10)

  /* Delivering status */
  await page.getByRole('combobox').click()
  await page.getByLabel('Em entrega').click()

  await page.getByRole('button', { name: 'Filtrar resultados' }).click()

  const tableDeliveringRows = await page
    .getByRole('cell', { name: 'Em entrega' })
    .all()

  await expect(tableDeliveringRows).toHaveLength(10)

  /* Delivered status */
  await page.getByRole('combobox').click()
  await page.getByLabel('Entregue').click()

  await page.getByRole('button', { name: 'Filtrar resultados' }).click()

  const tableDeliveredRows = await page
    .getByRole('cell', { name: 'Entregue' })
    .all()

  await expect(tableDeliveredRows).toHaveLength(10)
})
