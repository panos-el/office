import { ColumnSettings } from './column-settings.interface';

export function mapDateFilter(descriptor: any, columns: ColumnSettings[]) {
    const filters = descriptor.filters || [];

    filters.forEach((filter: any) => {
        if (filter.filters) {
            mapDateFilter(filter, columns);
        } else {
            try {
                const filterType = columns.find(x => x.field == filter.field)?.filter;

                if (filterType === 'date' && filter.value) {
                    filter.value = new Date(filter.value);
                }
            }
            catch {
                console.error('Error mapDateFilter.');
            }
        }
    });
};
