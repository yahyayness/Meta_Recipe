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