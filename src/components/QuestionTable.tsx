// 'use client';

import * as React from 'react';

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { QueryClientProvider, useQuery, useQueryClient } from '@tanstack/react-query';
import { ArrowUpDown, ChevronDown, GaugeCircle, Loader2, UserRound } from 'lucide-react';
import { Tags } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Helpers from '@/utils/Helpers';
import axios from 'axios';

const data: Problem[] = Helpers.getProblems();

export type Problem = {
  contestId: number;
  index: string;
  solvedCount: number;
  rating: number;
  name: string;
  tags: Array<string>;
};

export const columns: ColumnDef<Problem>[] = [
  {
    accessorKey: 'name',
    header: 'Problem Name',
    cell: ({ row }) => {
      const problem = row.original;
      return (
        <div className="capitalize">
          <a
            href={`https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`}
            className={`font-medium text-blue-600 dark:text-blue-500 hover:underline`}
            target="_blank"
          >
            {' '}
            {row.getValue('name')}
          </a>
        </div>
      );
    },
    // enableColumnFilter: true,
    // enableGlobalFilter: true,
  },
  {
    accessorKey: 'tags',
    header: () => {
      return (
        <div className="text-left">
          <Button variant="ghost">
            Tags
            <Tags className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const randomColor = Helpers.randomColors();

      return (
        <div className="capitalize flex flex-wrap gap-1 items-center">
          {row.getValue('tags') &&
            row.getValue('tags').map((tag, index) => (
              <span
                key={index}
                className={`bg-${randomColor}-200 text-${randomColor}-800 text-xs font-medium me-2 px-3 py-2 rounded-full dark:bg-${randomColor}-300 dark:text-${randomColor}-600`}
              >
                {tag}
              </span>
            ))}
          {(!row.getValue('tags') || row.getValue('tags').length === 0) && (
            <>
              <span
                className={`bg-red-200 text-red-800 text-xs font-medium me-2 px-3 py-2 rounded-full dark:bg-red-500 dark:text-red-900`}
              >
                No tags ☠
              </span>
            </>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'rating',
    header: ({ column }) => {
      return (
        <div className="text-left">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Rating
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    enableColumnFilter: true,
    enableGlobalFilter: true,
    cell: ({ row }) => {
      const rating = parseFloat(row.getValue('rating'));
      const randomColor = Helpers.randomColors();
      return (
        <div className="text-left font-medium flex">
          <span
            className={`bg-${randomColor}-200 text-${randomColor}-800 text-xs font-medium me-2 px-3 py-2 rounded-full dark:bg-${randomColor}-300 dark:text-${randomColor}-800 flex justify-start items-center gap-1`}
          >
            <GaugeCircle className="h-4 w-4" />
            {rating}
          </span>
        </div>
      );
    },
  },
  {
    id: 'Solved Count',
    accessorKey: 'solvedCount',
    header: () => {
      return (
        <Button variant="ghost">
          Solved Count
          <UserRound className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const solvedCount = row.original.solvedCount;
      const randomColor = Helpers.randomColors();
      return (
        <div>
          {!solvedCount ? (
            <span
              className={`bg-red-300 text-red-900 text-xs font-medium me-2 px-3 py-2 rounded-full dark:bg-red-300 dark:text-red-900`}
            >
              {' '}
              Not available{' '}
            </span>
          ) : (
            <div className="flex">
              {' '}
              <span
                className={`bg-${randomColor}-200 text-${randomColor}-800 text-xs font-medium me-2 px-3 py-2 rounded-full dark:bg-${randomColor}-300 dark:text-${randomColor}-800 flex w-auto items-start`}
              >
                {' '}
                <UserRound className="h-4 w-4 self-start" /> {solvedCount}{' '}
              </span>{' '}
            </div>
          )}
        </div>
      );
    },
  },
];

export function QuestionTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({ 'Solved Count': false });
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

  return (
    <div className="w-full ">
      {!table && <Loader2 className='animate-spin'/>}
      {table != null && <>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter problems..."
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) => {
            table.getColumn('name')?.setFilterValue(event.target.value);
            table.getColumn('rating')?.setFilterValue(event.target.value);


          }}
          className="max-w-sm dark:bg-slate-800"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="dark:darkmodecolor-table">
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="dark:darkmodecolor-table" align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border dark:darkmodecolor-table">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-center space-x-2 py-4">
      <div className="flex-1 text-sm text-muted-foreground">
          {table.getRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} problem(s).
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
      </>
      }
    </div>
  );
}
