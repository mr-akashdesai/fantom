import {enUS} from 'date-fns/locale'
import {formatDistanceToNowStrict} from 'date-fns'

export function formattedDistanceToNow(date: Date | number): string {
    const options = {
      locale: {
        ...enUS,
        formatDistance: (unit: string, count: number) => {
          switch (true) {
            case unit === 'xDays':
              return `${count} d`
  
            case unit === 'xHours':
              return `${count} hr`
  
            case unit === 'xMinutes':
              return `${count} min`
  
            case unit === 'xMonths':
              return `${count} mo`
  
            case unit === 'xSeconds':
              return 'just now'
  
            case unit === 'xYears':
              return `${count} y`
          }
  
          return '%d hours'
        },
      },
    }
  
    return formatDistanceToNowStrict(date, options)
  }