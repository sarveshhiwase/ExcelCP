import { jsx as _jsx } from "react/jsx-runtime";
//@ts-nocheck 
import { createContext, useContext, useEffect, useState } from 'react';
const initialState = {
    theme: 'system',
    setTheme: () => null,
};
const ThemeProviderContext = createContext(initialState);
export function ThemeProvider({ children, defaultTheme = 'system', storageKey = 'vite-ui-theme', ...props }) {
    const [theme, setTheme] = useState(() => localStorage.getItem(storageKey) || defaultTheme);
    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        if (theme === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
                .matches
                ? 'dark'
                : 'light';
            root.classList.add(systemTheme);
            return;
        }
        root.classList.add(theme);
    }, [theme]);
    const valueAPI = {
        theme,
        setTheme: (theme) => {
            localStorage.setItem(storageKey, theme);
            setTheme(theme);
        },
    };
    return (_jsx(ThemeProviderContext.Provider, { ...props, value: { value: [valueAPI.theme, valueAPI.setTheme] }, children: children }));
}
export const useTheme = () => {
    const { value } = useContext(ThemeProviderContext);
    const [theme, setTheme] = value;
    if (value === undefined)
        throw new Error('useTheme must be used within a ThemeProvider');
    return [theme, setTheme];
};
