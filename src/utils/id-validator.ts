export function isValidId(id: number){
    return !isNaN(id) && Number.isInteger(id) && id > 0;
}