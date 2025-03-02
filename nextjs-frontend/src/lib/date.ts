
const getDateWithoutTime = (date: Date) => {
    return date.toISOString().split('T')[0]
}

export const getDayTimeStart = (date: Date) => {
    const day = getDateWithoutTime(date)

    return `${day}T00:00:00.101Z`
}

export const getDayTimeEnd = (date: Date) => {
    const day = getDateWithoutTime(date)
    return `${day}T23:59:59.101Z`
}

export const getDateInNumberDays = (days: number) => {
    const current = new Date()
    current.setDate(current.getDate()+ days);

    return current
}

export const getTime = (time: string) => {
    if (time === undefined) return ''

    const date = new Date(time)
    let min = date.getMinutes().toString()

    if (min.length === 1) {
        min = "0" + min.toString();
    }

    let hour = date.getHours().toString()
    if (hour.length === 1) {
        hour = "0" + hour.toString();
    }
    return `${hour}:${min}`
}

export const getDate = (time: string) => {
    const date = new Date(time)
    return date.toLocaleDateString('en-GB', { year:"numeric", month:"short", day:"numeric", hour: "2-digit", minute: "2-digit"})
}
