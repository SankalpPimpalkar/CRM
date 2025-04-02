function getRelativeTimeString(date) {
    const now = new Date();
    const dateInput = new Date(date)
    const diffInSeconds = Math.round((dateInput - now) / 1000);

    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

    const units = [
        { unit: 'year', seconds: 31536000 },
        { unit: 'month', seconds: 2592000 },
        { unit: 'week', seconds: 604800 },
        { unit: 'day', seconds: 86400 },
        { unit: 'hour', seconds: 3600 },
        { unit: 'minute', seconds: 60 },
        { unit: 'second', seconds: 1 },
    ];

    for (const { unit, seconds } of units) {
        const interval = Math.floor(diffInSeconds / seconds);
        if (interval !== 0) {
            return rtf.format(interval, unit);
        }
    }
    return 'just now';
}

export default getRelativeTimeString