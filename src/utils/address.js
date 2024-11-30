let address = null;

export const getAddress = () => {
    if (address) {
        return address;
    }

    address = localStorage.getItem("address");
    return address;
};

export const setAddress = (newAddress) => {
    if (!newAddress) {
        return;
    }

    localStorage.setItem("address", JSON.stringify(newAddress));
    address = newAddress;
};
