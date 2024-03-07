

export function formatDate(date: Date) {
    const newDate = new Date(date);
    return newDate.toLocaleDateString().replaceAll('/', '/');
}