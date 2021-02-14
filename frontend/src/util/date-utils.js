import Dayjs from 'dayjs';

export const formatDateString = (isoDateStr, format = 'DD MMM, YYYY') => Dayjs(isoDateStr).format(format);

export const todaysDate = () => Dayjs().format('DD MMM, YYYY');

export const todaysDateISO = () => Dayjs().toISOString();

export const todaysDateISOOffset = () => Dayjs().format('YYYY-MM-DDTHH:mm:ss.SSSZ');

export const formatDateToISO = (dateStr) => Dayjs(dateStr).toISOString();

export const formatDateToISOOffset = (dateStr) => Dayjs(dateStr).format('YYYY-MM-DDTHH:mm:ss.SSSZ');

export const isValidDateString = (dateStr) => Dayjs(dateStr).isValid();