import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// @ts-nocheck 
import { ThemeProvider } from './components/ThemeProvider';
import { ColorModeToggle } from './components/ColorModeToggle';
import { QuestionTable } from './components/QuestionTable';
import { Sheet } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();
function App({ children }) {
    return (_jsx(QueryClientProvider, { client: queryClient, children: _jsxs(ThemeProvider, { defaultTheme: "dark", storageKey: "vite-ui-theme", children: [children, _jsxs("div", { className: "p-4 bg-slate-100 w-full min-h-screen flex justify-start gap-4 flex-col items-center dark:darkmodecolor dark:text-white", children: [_jsxs("div", { className: "w-full flex justify-between items-center gap-2 ", children: [_jsx("a", { href: "/", children: _jsxs("div", { className: "flex justify-start items-center gap-2 ", children: [_jsx(Sheet, {}), _jsx("h3", { className: 'font-extrabold text-xl text-slate-700 dark:text-slate-300', children: "ExcelCP" })] }) }), _jsx(ColorModeToggle, {})] }), _jsx(QuestionTable, {})] })] }) }));
}
export default App;
