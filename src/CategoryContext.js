import { createContext, useState } from 'react';

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
    const [storedCategory, setStoredCategory] = useState('daily');

    return (
        <CategoryContext.Provider value={{ storedCategory, setStoredCategory }}>
        {children}
        </CategoryContext.Provider>
    );
};

export default CategoryContext;