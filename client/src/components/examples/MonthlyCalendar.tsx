import MonthlyCalendar from '../MonthlyCalendar';

export default function MonthlyCalendarExample() {
  const events = [
    { date: "2025-10-15", count: 2, type: 'ctf' as const },
    { date: "2025-10-20", count: 1, type: 'conference' as const },
    { date: "2025-10-25", count: 3, type: 'workshop' as const },
  ];

  return <MonthlyCalendar events={events} onDateClick={(date) => console.log('Date clicked:', date)} />;
}
