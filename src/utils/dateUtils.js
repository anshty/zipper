// data & time
export const formatedDateTime = isoString => {
  const date = new Date(isoString);

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');

  const day = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  return `${hours}:${minutes}:${seconds} ${day} ${month}, ${year}`;
};

// only date
export const formatedDate = isoString => {
  const date = new Date(isoString);

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const day = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  return `${day} ${month}, ${year}`;
};

// DD-MM-YY
export const formatDateToDDMMYY = date => {
  if (!(date instanceof Date) || isNaN(date)) return '';

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);

  return `${day}-${month}-${year}`;
};

// YYYY-MM-DD
export const formatDateToYYYYMMDD = date => {
  if (!(date instanceof Date) || isNaN(date)) return '';

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
};

// HH:MM:SS using seconds
export const formatTime = secs => {
  const d = Math.floor(secs / (3600 * 24));
  const h = Math.floor((secs % (3600 * 24)) / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;

  if (d > 0) {
    return `${d} day left`;
  }

  const parts = [];
  if (h > 0) parts.push(`${h}h`);
  if (m > 0) parts.push(`${m}m`);
  parts.push(`${s}s`);

  return parts.join(' ');
};

// get remain time or date

export const getRemainingTime = expiryDateString => {
  const expiry = new Date(expiryDateString);
  const now = new Date();
  const diffInSeconds = Math.floor((expiry - now) / 1000);

  if (diffInSeconds <= 0) {
    return 'Expired';
  }

  const d = Math.floor(diffInSeconds / (3600 * 24));
  const h = Math.floor((diffInSeconds % (3600 * 24)) / 3600);
  const m = Math.floor((diffInSeconds % 3600) / 60);
  const s = diffInSeconds % 60;

  if (d > 0) {
    return `${d} day${d > 1 ? 's' : ''} left`;
  }

  const parts = [];
  if (h > 0) parts.push(`${h}h`);
  if (m > 0) parts.push(`${m}m`);
  parts.push(`${s}s`);

  return parts.join(' ');
};

// get time with 26 mar 2026 10:58 AM

export const formatDDMMYYYYHHMM = (isoString, sec) => {
  if (!isoString) return '';
  

  const date = new Date(isoString);

  const day = date.getDate().toString().padStart(2, '0');

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const showSec = sec
    ? `:${date.getSeconds().toString().padStart(2, '0')}`
    : '';
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // 0 → 12

  return `${day} ${month} ${year} ${hours}:${minutes}${showSec} ${ampm}`;
};

export const getDateRange = selectedDate => {
  const today = new Date();
  let fromDate = null;
  let toDate = null;

  const format = date => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  // Today

  if (selectedDate === 'Today') {
    fromDate = format(today);
  }

  // This Week (Monday → Sunday)
  if (selectedDate === 'This week') {
    const firstDay = new Date(today);
    const day = today.getDay(); // 0 = Sunday
    const diff = today.getDate() - day + (day === 0 ? -6 : 1);

    firstDay.setDate(diff);
    const lastDay = new Date(firstDay);
    lastDay.setDate(firstDay.getDate() + 6);

    fromDate = format(firstDay);
    toDate = format(lastDay);
  }

  // This Month
  if (selectedDate === 'This Month') {
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    fromDate = format(firstDay);
    toDate = format(lastDay);
  }

  // Last Month
  if (selectedDate === 'Last Month') {
    const firstDay = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth(), 0);

    fromDate = format(firstDay);
    toDate = format(lastDay);
  }

  // Last 1 Year (past 12 months)
  if (selectedDate === '1 year') {
    const pastDate = new Date();
    pastDate.setFullYear(today.getFullYear() - 1);

    fromDate = format(pastDate);
    toDate = format(today);
  }

  // Last 6 months
  if (selectedDate === 'Last 6 months') {
    const pastDate = new Date();
    pastDate.setMonth(today.getMonth() - 6);

    fromDate = format(pastDate);
    toDate = format(today);
  }

  // If year selected like 2023, 2024, 2025
  if (/^\d{4}$/.test(selectedDate)) {
    fromDate = `${selectedDate}-01-01`;
    toDate = `${selectedDate}-12-31`;
  }

  return { fromDate, toDate };
};
