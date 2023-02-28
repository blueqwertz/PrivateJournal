import dayjs from "dayjs"

export const generateDate = (selected = new Date(), month = dayjs().month(), year = dayjs().year()) => {
	const firstDateOfMonth = dayjs().year(year).month(month).startOf("month")
	const lastDateOfMonth = dayjs().year(year).month(month).endOf("month")

	const arrayOfDate = []

	// generate prefix date
	for (let i = 1; i < firstDateOfMonth.day(); i++) {
		arrayOfDate.push({ date: firstDateOfMonth.day(i), selected: firstDateOfMonth.day(i).toDate().toDateString() === selected.toDateString(), previousMonth: true })
	}

	// generate current date
	for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
		arrayOfDate.push({ date: firstDateOfMonth.date(i), currentMonth: true, selected: firstDateOfMonth.date(i).toDate().toDateString() === selected.toDateString(), today: firstDateOfMonth.date(i).toDate().toDateString() === new Date().toDateString() })
	}

	const remaining = 42 - arrayOfDate.length

	// generate suffix date
	for (let i = lastDateOfMonth.day() + 1; i <= lastDateOfMonth.day() + remaining; i++) {
		arrayOfDate.push({ date: lastDateOfMonth.day(i), selected: lastDateOfMonth.day(i).toDate().toDateString() === selected.toDateString(), nextMonth: true })
	}

	return arrayOfDate
}
