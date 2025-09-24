import { FormlyFieldConfig } from '@ngx-formly/core';
/**
 * Recursively traverse the tree of FormlyFieldConfig and return an object mapping keys to leaf nodes.
 *
 * A “leaf” node is defined as one that does not have any further nested fieldGroup (or fieldArray with fieldGroup)
 * —and if it has a defined key, it is included.
 *
 * Parent nodes (containers) without a key are simply skipped and their children are merged into the result.
 *
 * @param fields - Array of FormlyFieldConfig to traverse.
 * @returns An object whose properties are keys (from leaf nodes) mapped to their corresponding FormlyFieldConfig.
 */
export function getLeafNodesWithKeys(fields: FormlyFieldConfig[]): { [key: string]: FormlyFieldConfig } {
    let result: { [key: string]: FormlyFieldConfig } = {};

    for (const field of fields) {
        // Attempt to recurse into children (from fieldGroup and/or fieldArray)
        let childrenResult: { [key: string]: FormlyFieldConfig } = {};

        if (field.fieldGroup && field.fieldGroup.length > 0) {
            childrenResult = getLeafNodesWithKeys(field.fieldGroup);
        }
        if (field.fieldArray) {
            const fa: FormlyFieldConfig | null =
                typeof field.fieldArray === 'function' ? field.fieldArray(field) : field.fieldArray;
            if (fa && fa.fieldGroup && fa.fieldGroup.length > 0) {
                childrenResult = { ...childrenResult, ...getLeafNodesWithKeys(fa.fieldGroup) };
            }
        }

        // If there are nested results, use them.
        // Otherwise, if this node is a leaf (no children) and it has a key, add it.
        if (Object.keys(childrenResult).length > 0) {
            result = { ...result, ...childrenResult };
        } else {
            if (field.key !== undefined && field.key !== null) {
                result[field.key.toString()] = field;
            }
        }
    }

    return result;
}
