import { useMutation, useQueryClient } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ArrowRight, Search, X } from 'lucide-react'
import { useState } from 'react'

import { approveOrder } from '@/api/approve-order'
import { cancelOrder } from '@/api/cancel-orders'
import { deliverOrder } from '@/api/deliver-order'
import { dispatchOrder } from '@/api/dispatch-order'
import { IGetOrdersResponse } from '@/api/get-orders'
import { OrderStatus, OrderStatusType } from '@/components/order-status'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

import { OrderDetails } from './order-details'

interface OrderTableRowProps {
  order: {
    orderId: string
    createdAt: string
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
    customerName: string
    total: number
  }
}

export function OrderTableRow({ order }: OrderTableRowProps) {
  const queryClient = useQueryClient()

  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  function updateOrderStatusOnCache(orderId: string, status: OrderStatusType) {
    const ordersListCache = queryClient.getQueriesData<IGetOrdersResponse>({
      queryKey: ['orders'],
    })

    ordersListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) {
        return
      }

      queryClient.setQueryData<IGetOrdersResponse>(cacheKey, {
        ...cacheData,
        orders: cacheData.orders.map((order) => {
          if (order.orderId === orderId) {
            return {
              ...order,
              status,
            }
          }

          return order
        }),
      })
    })
  }

  const cancelOrderMutation = useMutation({
    mutationFn: cancelOrder,
    onSuccess: (_, { orderId }) => {
      updateOrderStatusOnCache(orderId, 'canceled')
    },
  })

  const approveOrderMutation = useMutation({
    mutationFn: approveOrder,
    onSuccess: (_, { orderId }) => {
      updateOrderStatusOnCache(orderId, 'processing')
    },
  })

  const dispatchOrderMutation = useMutation({
    mutationFn: dispatchOrder,
    onSuccess: (_, { orderId }) => {
      updateOrderStatusOnCache(orderId, 'delivering')
    },
  })

  const deliverOrderMutation = useMutation({
    mutationFn: deliverOrder,
    onSuccess: (_, { orderId }) => {
      updateOrderStatusOnCache(orderId, 'delivered')
    },
  })

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>

          <OrderDetails orderId={order.orderId} open={isDetailsOpen} />
        </Dialog>
      </TableCell>

      <TableCell className="font-mono text-xs font-medium">
        {order.orderId}
      </TableCell>

      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(Date.parse(order.createdAt), { addSuffix: true })}
      </TableCell>

      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>

      <TableCell className="font-medium">{order.customerName}</TableCell>

      <TableCell className="font-medium">
        {(order.total / 100).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </TableCell>

      <TableCell>
        {order.status === 'pending' && (
          <Button
            disabled={approveOrderMutation.isPending}
            variant="outline"
            size="xs"
            onClick={() =>
              approveOrderMutation.mutateAsync({ orderId: order.orderId })
            }
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            Aprovar
          </Button>
        )}

        {order.status === 'processing' && (
          <Button
            disabled={dispatchOrderMutation.isPending}
            variant="outline"
            size="xs"
            onClick={() =>
              dispatchOrderMutation.mutateAsync({ orderId: order.orderId })
            }
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            Em entrega
          </Button>
        )}

        {order.status === 'delivering' && (
          <Button
            disabled={deliverOrderMutation.isPending}
            variant="outline"
            size="xs"
            onClick={() =>
              deliverOrderMutation.mutateAsync({ orderId: order.orderId })
            }
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            Entregue
          </Button>
        )}
      </TableCell>

      <TableCell>
        <Button
          disabled={
            !['pending', 'processing'].includes(order.status) ||
            cancelOrderMutation.isPending
          }
          variant="ghost"
          size="xs"
          onClick={() =>
            cancelOrderMutation.mutateAsync({ orderId: order.orderId })
          }
        >
          <X className="mr-2 h-3 w-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}
