export const cutStr = (str) => str.length > 70 ? `${str.slice(0, 70)} ...` : str;

export const getHumanDate = (date) => new Date(date).toLocaleDateString(); 