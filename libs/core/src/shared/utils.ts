
export function isDefined(value: any): boolean {
    return typeof value !== 'undefined' && value !== null;
}

export function stringFormat(value: string, ...args: any[]): any {
    
    if (isDefined(args[0]) && args.length) {
        return value.replace(/{(\d+)}/g, (_, index) => args[index] || '')
    }

    return value;
}

/**
 * a date string in ISO format to a JavaScript Date object.
 * @param value
 * @returns
 */
export function isoDateStringToDate(value: string) {
    if (typeof value === 'string' && isIsoDateString(value)) {
        return new Date(value);
    }
    return value;
}

/**
 * Checks if a string is in a basic ISO 8601 date format.
 * Adjust the regex if your date strings have a different format.
 * @param {string} value
 * @returns {boolean}
 */
export function isIsoDateString(value: string) {
    // This regex matches strings like "2025-02-11T00:00:00"
    const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;
    return isoDateRegex.test(value);
}

/**
 * Recursively iterates through an object and converts any property that is
 * a date string in ISO format to a JavaScript Date object.
 * @param {object|Array} entity - The object or array to process.
 */
export function mapDateProperties(entity: any) {
    if (entity && typeof entity === 'object') {
        // If it's an array, iterate over each element.
        if (Array.isArray(entity)) {
            entity.forEach((item) => mapDateProperties(item));
        } else {
            // Iterate over each property of the object.
            Object.keys(entity).forEach((key) => {
                const value = entity[key];
                if (typeof value === 'string' && isIsoDateString(value)) {
                    // Convert and set the date string as a Date object.
                    entity[key] = new Date(value);
                } else if (typeof value === 'object' && value !== null) {
                    // Recursively check nested objects or arrays.
                    mapDateProperties(value);
                }
            });
        }
    }
}