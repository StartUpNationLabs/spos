

export const setSelectedTableById = (tables, tableId, setSelectedTable) => {
    const foundTable = tables.find((table) => table.id === tableId);
    if (foundTable) {
        setSelectedTable(foundTable);
    }
};