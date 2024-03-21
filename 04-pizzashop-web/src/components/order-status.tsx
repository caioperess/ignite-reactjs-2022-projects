export type OrderStatusType =
  | 'pending'
  | 'canceled'
  | 'processing'
  | 'delivering'
  | 'delivered'

interface OrderStatusProps {
  status: OrderStatusType
}

const orderStatusMap: Record<
  OrderStatusType,
  { label: string; color: string }
> = {
  pending: { label: 'Pendente', color: 'bg-slate-400' },
  canceled: { label: 'Cancelado', color: 'bg-rose-500' },
  delivered: { label: 'Entregue', color: 'bg-emerald-500' },
  delivering: { label: 'Em entrega', color: 'bg-amber-500' },
  processing: { label: 'Em preparo', color: 'bg-amber-500' },
}

export function OrderStatus({ status }: OrderStatusProps) {
  return (
    <div className="flex items-center gap-2">
      <span
        data-testid="badge"
        className={`h-2 w-2 rounded-full ${orderStatusMap[status].color}`}
      />

      <span className="font-medium text-muted-foreground">
        {orderStatusMap[status].label}
      </span>
    </div>
  )
}
