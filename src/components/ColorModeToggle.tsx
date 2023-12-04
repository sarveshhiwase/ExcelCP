import {  Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useTheme } from './ThemeProvider';

export function ColorModeToggle() {
  const [value, setTheme] = useTheme();
  console.log(value);

  return (
    <Button
      variant={'secondary'}
      onClick={() => (value === 'light' ? setTheme('dark') : setTheme('light'))}
    >
      {value === 'light' ? (
        <Moon className="animate-pulse" />
      ) : (
        <Sun className="animate-pulse" />
      )}
    </Button>
  );
}
