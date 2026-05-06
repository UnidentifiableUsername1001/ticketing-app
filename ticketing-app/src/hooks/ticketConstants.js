function statusMapping() {
    const statusArray = ['Open', 'In progress', 'Closed'];
    const mappedArray = statusArray.map((status) => ({
        value: status,
        label: status,
    }));

    return mappedArray;
}

export default statusMapping;