/**
 * save data into localStorage
 * @param key
 * @param value
 * @param needsParse
 * @author Amr
 */
export const setLocalAttribute = (key: string, value: any, needsParse: boolean = false): void => {
    localStorage.setItem(key, needsParse ? JSON.stringify(value) : value)
}
/**
 * read data from localStorage
 * @param key
 * @param needsParse
 * @author Amr
 */
export const getLocalAttribute = (key: string, needsParse: boolean = false) => {
    const data = localStorage.getItem(key)
    return data && needsParse ? JSON.parse(data) : data
}
/**
 * this one sets the default tome
 */
export const getDefaultTime = (hours: number = 0 , minutes:number = 0 , seconds:number = 0) => {
    const defaultTime = new Date();
    defaultTime.setHours(hours);
    defaultTime.setMinutes(minutes);
    return defaultTime;
}