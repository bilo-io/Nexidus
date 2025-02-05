/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

import './index.css'

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table'
import Button from '../Forms/Button'
import Input from '../Forms/Input'
import { paginationOptions } from '../../../utils/constants'
import Dropdown from '../Dropdown'

export const Table = ({ data, columns }: { data: any[], columns: ColumnDef<any>[], }) => {
    // const rerender = React.useReducer(() => ({}), {})[1]

    // Create the table and pass your options
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    // Manage your own state
    const [state, setState] = React.useState(table.initialState)

    // Override the state managers for the table to your own
    table.setOptions(prev => ({
        ...prev,
        state,
        onStateChange: setState,
        // These are just table options, so if things
        // need to change based on your state, you can
        // derive them here

        // Just for fun, let's debug everything if the pageIndex
        // is greater than 2
        debugTable: state.pagination.pageIndex > 2,
    }))

    return (
        <div className="p-0 w-full">
            <table className='w-full'>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} colSpan={header.colSpan}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody className='overflow-hidden overflow-y-auto' style={{ maxHeight: 'calc(50vh - 20rem)' }}>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id} className='h-6'>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    {table.getFooterGroups().map(footerGroup => (
                        <tr key={footerGroup.id}>
                            {footerGroup.headers.map(header => (
                                <th key={header.id} colSpan={header.colSpan}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.footer,
                                            header.getContext()
                                        )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </tfoot>
            </table>
            <div className="h-2" />
            <div className="flex justify-between items-center gap-2 w-full">
                <div className='flex flex-row items-center gap-2'>
                    <Button
                        className="rounded-lg p-1 px-2"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {'<<'}
                    </Button>
                    <Button
                        className="rounded-lg p-1 px-3"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {'<'}
                    </Button>
                    <Button
                        className="rounded-lg p-1 px-3"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        {'>'}
                    </Button>
                    <Button
                        className="rounded-lg p-1 px-2"
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                    >
                        {'>>'}
                    </Button>
                </div>
                <div className='flex flex-row items-center gap-2'>

                    <span className="flex items-center gap-1">
                        <div>Page</div>

                        <div className='font-bold'>{table.getState().pagination.pageIndex + 1}{' '}</div>
                        <div>of</div>
                        <div className='font-bold'>{table.getPageCount()}</div>

                    </span>
                    <div className="flex items-center gap-1">
                        <div className='min-w-32'>| Go to page:</div>
                        <div><Input
                            type="number"
                            min="1"
                            max={table.getPageCount()}
                            defaultValue={table.getState().pagination.pageIndex + 1}
                            onChange={e => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0
                                table.setPageIndex(page)
                            }}
                            className="border p-1 rounded w-16"
                        />
                        </div>
                    </div>
                    <Dropdown
                        // value={''}
                        options={paginationOptions}
                        onChange={(value: string) => {
                            table.setPageSize(Number(value as string))
                        }}
                        value={table.getState().pagination.pageSize.toString()}
                    // options={paginationOptions}
                    // onChange={(e: { target: { value: any } }) => {
                    //     table.setPageSize(Number(e.target.value))
                    // }}
                    />
                </div>
            </div>
            <div className="h-4" />
            {/* <Button onClick={() => rerender()} className="border p-2">
                Rerender
            </Button> */}
        </div>
    )
}

export default Table;