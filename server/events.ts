import { PBService } from "@functions/database"
import moment from "moment"

export default async function getEvents({
  pb,
  start,
  end
}: {
  pb: PBService
  start: string
  end: string
}) {
  return (
    await pb.getFullList
      .collection('todo_list__entries')
      .filter([
        { field: 'due_date', operator: '>=', value: start },
        { field: 'due_date', operator: '<=', value: end }
      ])
      .execute()
      .catch(() => [])
  ).map(entry => ({
    id: entry.id,
    type: 'single' as const,
    title: entry.summary,
    start: entry.due_date,
    end: moment(entry.due_date).add(1, 'millisecond').toISOString(),
    category: '_todo',
    calendar: '',
    description: entry.notes,
    location: '',
    location_coords: { lat: 0, lon: 0 },
    reference_link: `/todo-list?entry=${entry.id}`,
    is_strikethrough: entry.done
  }))
}
