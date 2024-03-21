import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useCycle } from '../../context/CyclesContext'
import { HistoryContainer, HistoryList, StatusBadge } from './styles'

export function History() {
  const { cycles } = useCycle()

  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => (
              <tr key={cycle.id}>
                <td>{cycle.task}</td>
                <td>{cycle.minutes} minutos</td>
                <td>
                  {formatDistanceToNow(cycle.startDate, {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </td>
                <td>
                  {cycle.finishedDate && (
                    <StatusBadge statusColor="green">Concluído</StatusBadge>
                  )}

                  {cycle.interruptedDate && (
                    <StatusBadge statusColor="red">Interrompido</StatusBadge>
                  )}

                  {!cycle.finishedDate && !cycle.interruptedDate && (
                    <StatusBadge statusColor="yellow">Em andamento</StatusBadge>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
