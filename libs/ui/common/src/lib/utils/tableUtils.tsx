
export const tablesMenu = [
    {
        id: 1,
        orders: {
            Drinks: ['Coke', 'Pepsi','Coke', 'Pepsi','Coke', 'Pepsi'],
            Starter: ['Salad'],
            MainCourse: ['Steak'],
            Dessert: ['Ice Cream'],
        },
    },
    {
        id: 2,
        orders: {
            Drinks: ['Water'],
            Starter: ['Soup'],
            MainCourse: ['Fish'],
            Dessert: ['Cake'],
        },
    },
    {
        id: 3,
        orders: {
            Drinks: ['Juice'],
            Starter: ['Salad', 'Soup'],
            MainCourse: ['Pasta'],
            Dessert: [],
        },
    },
    {
        id: 4,
        orders: {
            Drinks: ['Coke'],
            Starter: [],
            MainCourse: ['Steak', 'Fish'],
            Dessert: ['Ice Cream'],
        },
    },
];

export const classicMenu = {
        Drinks: ['Coke', 'Pepsi','Coke', 'Pepsi','Coke', 'Pepsi'],
        Starter: ['Salad'],
        MainCourse: ['Steak'],
        Dessert: ['Ice Cream'],
}


export const setSelectedTableById = (tables, tableId, setSelectedTable) => {
    const foundTable = tables.find((table) => table.id === tableId);
    if (foundTable) {
        setSelectedTable(foundTable);
    }
};
