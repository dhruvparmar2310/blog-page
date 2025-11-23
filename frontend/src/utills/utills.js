export const formatDate = (date) => {
    const currentDate = new Date(date)
    const currentDay =  currentDate.getDate().toString()?.length === 1 ? `0${currentDate.getDate()}` : currentDate.getDate()
    const currentMonth = (currentDate.getMonth() + 1).toString()?.length === 1 ? currentDate.toLocaleString('en-US', { month: 'long' }) : (currentDate.getMonth() + 1)
    const currentYear = currentDate.getFullYear()
    return `${currentDay} ${currentMonth} ${currentYear}`
}