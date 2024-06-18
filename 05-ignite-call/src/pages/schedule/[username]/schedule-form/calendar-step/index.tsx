import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { Calendar } from '@/components/Calendar'
import { api } from '@/lib/axios'

import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from './styles'

interface Availability {
  possibleTimes: number[]
  availableTimes: number[]
}

interface CalendarStepProps {
  onSelectDateTime: (date: Date) => void
}

export function CalendarStep({ onSelectDateTime }: CalendarStepProps) {
  const router = useRouter()
  const username = String(router.query.username)

  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const selectedDateWithoutTime =
    dayjs(selectedDate).format('YYYY-MM-DD') ?? null

  const { data: availability } = useQuery({
    enabled: !!selectedDate,
    queryKey: ['availability', username, selectedDateWithoutTime],
    queryFn: async () => {
      const response = await api.get<Availability>(
        `/users/${username}/availability`,
        {
          params: { date: selectedDateWithoutTime },
        },
      )

      return response.data
    },
  })

  const isDateSelected = !!selectedDate

  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
  const describedDate = selectedDate
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : ''

  const handleSelectTime = (hour: number) => {
    const dateWithTime = dayjs(selectedDate).set('hour', hour).startOf('hour')

    onSelectDateTime(dateWithTime.toDate())
  }

  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar onDateSelected={setSelectedDate} />

      {isDateSelected && (
        <TimePicker>
          <TimePickerHeader>
            {weekDay} <span>{describedDate}</span>
          </TimePickerHeader>

          <TimePickerList>
            {availability?.possibleTimes.map((hour) => (
              <TimePickerItem
                key={hour}
                disabled={!availability.availableTimes.includes(hour)}
                onClick={() => handleSelectTime(hour)}
              >
                {String(hour).padStart(2, '0')}:00h
              </TimePickerItem>
            ))}
          </TimePickerList>
        </TimePicker>
      )}
    </Container>
  )
}
