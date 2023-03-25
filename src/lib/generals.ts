import { Duration } from 'luxon';

export const humanizationOfTimeDuration = (minutesParam : number) => {
    if (minutesParam) {
        const minutesToDays = Duration.fromObject({ minutes: minutesParam }).as('days');
        const minutesToHour = Duration.fromObject({ minutes: minutesParam }).as('hours');
        if (minutesToDays >= 1) {
            if (minutesToDays === 1) {
                return `${Math.ceil(minutesToDays)} día hábil`;
            }
            return `${Math.ceil(minutesToDays)} días hábiles`;
        } if (minutesToDays < 1) {
            if (minutesToHour === 1) {
                return `${Math.ceil(minutesToHour)} hora hábil`;
            }
            return `${Math.ceil(minutesToHour)} horas hábiles`;
        } if (minutesToHour < 1) {
            if (minutesParam === 1) {
                return `${Math.ceil(minutesParam)} minuto hábil`;
            }
            return `${Math.ceil(minutesParam)} minutos hábiles`;
        }
        return '0';
    }
    return minutesParam;
}

