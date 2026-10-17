// Ordering for timeline lists (experiences, internships, projects).
//
// `period` values come from portfolio.json and are free-form strings such as
// "July 2025", "March – April 2024", or "October 2024 – Present". Parsing them
// in one place keeps every list consistent: ongoing entries ("Present") first,
// then the rest by start date, most recent first.

const MONTHS = {
	jan: 0,
	feb: 1,
	mar: 2,
	apr: 3,
	may: 4,
	jun: 5,
	jul: 6,
	aug: 7,
	sep: 8,
	oct: 9,
	nov: 10,
	dec: 11
};

// A period is "Start – End", where either side may omit the year
// ("March – April 2024") and the end may be "Present".
const parsePeriod = (period) => {
	const text = period ?? "";
	const isActive = /present/i.test(text);

	const parts = text
		.split(/[–—-]/)
		.map((part) => part.trim())
		.filter(Boolean);

	const read = (part) => {
		if (!part) return { month: undefined, year: undefined };
		const name = part.match(/[A-Za-z]+/);
		const year = part.match(/\d{4}/);
		return {
			month: name ? MONTHS[name[0].slice(0, 3).toLowerCase()] : undefined,
			year: year ? Number(year[0]) : undefined
		};
	};

	const start = read(parts[0]);
	const end = read(parts[parts.length - 1]);

	// "March – April 2024" states the year once, so the start borrows it.
	const startYear = start.year ?? end.year;
	const endYear = end.year ?? start.year;

	const toKey = ({ month }, year) =>
		month === undefined || year === undefined ? 0 : year * 12 + month;

	return { isActive, start: toKey(start, startYear), end: toKey(end, endYear) };
};

export const sortByPeriodDesc = (items) =>
	[...items]
		.map((item, index) => ({ item, index, ...parsePeriod(item.period) }))
		.sort((a, b) => {
			if (a.isActive !== b.isActive) return a.isActive ? -1 : 1;
			if (a.start !== b.start) return b.start - a.start;
			if (a.end !== b.end) return b.end - a.end;
			return a.index - b.index;
		})
		.map(({ item }) => item);
