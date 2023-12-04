import { jsx as _jsx } from "react/jsx-runtime";
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from './ThemeProvider';
export function ColorModeToggle() {
    const [value, setTheme] = useTheme();
    console.log(value);
    return (_jsx(Button, { variant: 'secondary', onClick: () => (value === 'light' ? setTheme('dark') : setTheme('light')), children: value === 'light' ? (_jsx(Moon, { className: "animate-pulse" })) : (_jsx(Sun, { className: "animate-pulse" })) }));
}
