import { ITransaction } from '@/models/Transaction'
import { api } from '@/services/api'
import { useCallback, useEffect, useState } from 'react'
import { createContext, useContextSelector } from 'use-context-selector'

interface TransactionsProviderProps {
  children: React.ReactNode
}

interface CreateTransactionInput {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

interface TransactionsContextType {
  transactions: ITransaction[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransaction: (data: CreateTransactionInput) => Promise<void>
}

const TransactionsContext = createContext({} as TransactionsContextType)

const TransactionsProvider = ({ children }: TransactionsProviderProps) => {
  const [transactions, setTransactions] = useState<ITransaction[]>([])

  const fetchTransactions = useCallback(async (query?: string) => {
    const response = await api.get<ITransaction[]>('/transactions', {
      params: {
        _sort: 'createdAt',
        q: query,
      },
    })

    setTransactions(response.data)
  }, [])

  const createTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      const response = await api.post('/transactions', {
        ...data,
        createdAt: new Date().toISOString(),
      })

      setTransactions((transactions) => [...transactions, response.data])
    },
    [],
  )

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}

function useTransactions<T>(
  selector: (context: TransactionsContextType) => T,
): T {
  return useContextSelector(TransactionsContext, selector)
}

export { TransactionsProvider, useTransactions }

