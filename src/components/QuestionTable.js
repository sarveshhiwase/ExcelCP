import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
// @ts-nocheck 
import * as React from 'react';
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, } from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown, GaugeCircle, Loader2, UserRound } from 'lucide-react';
import { Tags } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger, } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from '@/components/ui/table';
import Helpers from '@/utils/Helpers';
const data = Helpers.getProblems();
export const columns = [
    {
        accessorKey: 'name',
        header: 'Problem Name',
        cell: ({ row }) => {
            const problem = row.original;
            return (_jsx("div", { className: "capitalize", children: _jsxs("a", { href: `https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`, className: `font-medium text-blue-600 dark:text-blue-500 hover:underline`, target: "_blank", children: [' ', row.getValue('name')] }) }));
        },
        // enableColumnFilter: true,
        // enableGlobalFilter: true,
    },
    {
        accessorKey: 'tags',
        header: () => {
            return (_jsx("div", { className: "text-left", children: _jsxs(Button, { variant: "ghost", children: ["Tags", _jsx(Tags, { className: "ml-2 h-4 w-4" })] }) }));
        },
        cell: ({ row }) => {
            const randomColor = Helpers.randomColors();
            return (_jsxs("div", { className: "capitalize flex flex-wrap gap-1 items-center", children: [row.getValue('tags') &&
                        row.getValue('tags').map((tag, index) => (_jsx("span", { className: `bg-${randomColor}-200 text-${randomColor}-800 text-xs font-medium me-2 px-3 py-2 rounded-full dark:bg-${randomColor}-300 dark:text-${randomColor}-600`, children: tag }, index))), (!row.getValue('tags') || row.getValue('tags').length === 0) && (_jsx(_Fragment, { children: _jsx("span", { className: `bg-red-200 text-red-800 text-xs font-medium me-2 px-3 py-2 rounded-full dark:bg-red-500 dark:text-red-900`, children: "No tags \u2620" }) }))] }));
        },
    },
    {
        accessorKey: 'rating',
        header: ({ column }) => {
            return (_jsx("div", { className: "text-left", children: _jsxs(Button, { variant: "ghost", onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'), children: ["Rating", _jsx(ArrowUpDown, { className: "ml-2 h-4 w-4" })] }) }));
        },
        enableColumnFilter: true,
        enableGlobalFilter: true,
        cell: ({ row }) => {
            const rating = parseFloat(row.getValue('rating'));
            const randomColor = Helpers.randomColors();
            return (_jsx("div", { className: "text-left font-medium flex", children: _jsxs("span", { className: `bg-${randomColor}-200 text-${randomColor}-800 text-xs font-medium me-2 px-3 py-2 rounded-full dark:bg-${randomColor}-300 dark:text-${randomColor}-800 flex justify-start items-center gap-1`, children: [_jsx(GaugeCircle, { className: "h-4 w-4" }), rating] }) }));
        },
    },
    {
        id: 'Solved Count',
        accessorKey: 'solvedCount',
        header: () => {
            return (_jsxs(Button, { variant: "ghost", children: ["Solved Count", _jsx(UserRound, { className: "ml-2 h-4 w-4" })] }));
        },
        cell: ({ row }) => {
            const solvedCount = row.original.solvedCount;
            const randomColor = Helpers.randomColors();
            return (_jsx("div", { children: !solvedCount ? (_jsxs("span", { className: `bg-red-300 text-red-900 text-xs font-medium me-2 px-3 py-2 rounded-full dark:bg-red-300 dark:text-red-900`, children: [' ', "Not available", ' '] })) : (_jsxs("div", { className: "flex", children: [' ', _jsxs("span", { className: `bg-${randomColor}-200 text-${randomColor}-800 text-xs font-medium me-2 px-3 py-2 rounded-full dark:bg-${randomColor}-300 dark:text-${randomColor}-800 flex w-auto items-start`, children: [' ', _jsx(UserRound, { className: "h-4 w-4 self-start" }), " ", solvedCount, ' '] }), ' '] })) }));
        },
    },
];
export function QuestionTable() {
    const [sorting, setSorting] = React.useState([]);
    const [columnFilters, setColumnFilters] = React.useState([]);
    const [columnVisibility, setColumnVisibility] = React.useState({ 'Solved Count': false });
    const [rowSelection, setRowSelection] = React.useState({});
    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });
    return (_jsxs("div", { className: "w-full ", children: [!table && _jsx(Loader2, { className: 'animate-spin' }), table != null && _jsxs(_Fragment, { children: [_jsxs("div", { className: "flex items-center py-4", children: [_jsx(Input, { placeholder: "Filter problems...", value: table.getColumn('name')?.getFilterValue() ?? '', onChange: (event) => {
                                    table.getColumn('name')?.setFilterValue(event.target.value);
                                    table.getColumn('rating')?.setFilterValue(event.target.value);
                                }, className: "max-w-sm dark:bg-slate-800" }), _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, className: "dark:darkmodecolor-table", children: _jsxs(Button, { variant: "outline", className: "ml-auto", children: ["Columns ", _jsx(ChevronDown, { className: "ml-2 h-4 w-4" })] }) }), _jsx(DropdownMenuContent, { className: "dark:darkmodecolor-table", align: "end", children: table
                                            .getAllColumns()
                                            .filter((column) => column.getCanHide())
                                            .map((column) => {
                                            return (_jsx(DropdownMenuCheckboxItem, { className: "capitalize", checked: column.getIsVisible(), onCheckedChange: (value) => column.toggleVisibility(!!value), children: column.id }, column.id));
                                        }) })] })] }), _jsx("div", { className: "rounded-md border dark:darkmodecolor-table", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: table.getHeaderGroups().map((headerGroup) => (_jsx(TableRow, { children: headerGroup.headers.map((header) => {
                                            return (_jsx(TableHead, { children: header.isPlaceholder
                                                    ? null
                                                    : flexRender(header.column.columnDef.header, header.getContext()) }, header.id));
                                        }) }, headerGroup.id))) }), _jsx(TableBody, { children: table.getRowModel().rows?.length ? (table.getRowModel().rows.map((row) => (_jsx(TableRow, { "data-state": row.getIsSelected() && 'selected', children: row.getVisibleCells().map((cell) => (_jsx(TableCell, { children: flexRender(cell.column.columnDef.cell, cell.getContext()) }, cell.id))) }, row.id)))) : (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: columns.length, className: "h-24 text-center", children: "No results." }) })) })] }) }), _jsxs("div", { className: "flex items-center justify-center space-x-2 py-4", children: [_jsxs("div", { className: "flex-1 text-sm text-muted-foreground", children: [table.getRowModel().rows.length, " of", " ", table.getFilteredRowModel().rows.length, " problem(s)."] }), _jsxs("div", { className: "space-x-2", children: [_jsx(Button, { variant: "outline", size: "sm", onClick: () => table.previousPage(), disabled: !table.getCanPreviousPage(), children: "Previous" }), _jsx(Button, { variant: "outline", size: "sm", onClick: () => table.nextPage(), disabled: !table.getCanNextPage(), children: "Next" })] })] })] })] }));
}
