// @ts-nocheck 
import { ThemeProvider } from './components/ThemeProvider';
import { ColorModeToggle } from './components/ColorModeToggle';
import { QuestionTable } from './components/QuestionTable';
import { Sheet } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();
function App({ children }: any) {

  return (
    <QueryClientProvider client={queryClient}> 
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {children}
      <div className="p-4 bg-slate-100 w-full min-h-screen flex justify-start gap-4 flex-col items-center dark:darkmodecolor dark:text-white">
        <div className="w-full flex justify-between items-center gap-2 ">
          <a href="/">
          <div className="flex justify-start items-center gap-2 ">
            <Sheet />
            <h3 className='font-extrabold text-xl text-slate-700 dark:text-slate-300'>

            ExcelCP
            </h3>

          </div>
          </a>
          <ColorModeToggle />
        </div>
        <QuestionTable />
      </div>
    </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
