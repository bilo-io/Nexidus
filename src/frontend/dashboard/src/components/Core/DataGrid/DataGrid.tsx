import React, { useEffect, useMemo, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import {
    AllCommunityModule,
    ModuleRegistry,
    ColDef,
    ColGroupDef,
    GridOptions,
    ICellRendererParams,
} from 'ag-grid-community';

import { MasterDetailModule } from 'ag-grid-enterprise';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule, MasterDetailModule]);

// DataGrid Props with Generics
interface DataGridProps<T> {
    gridKey?: string,
    rowData: T[] | null | undefined;
    colDefs: (ColDef<T> | ColGroupDef<T>)[] | null | undefined;
    defaultColDef?: ColDef<T>,
    detailCellRenderer?: React.FC<{ data: T }>;
    pagination?: boolean;
    paginationPageSize?: number;
    paginationPageSizeSelector?: number[];
}

export const DataGrid = <T extends object>({
    gridKey,
    rowData,
    colDefs,
    defaultColDef,
    detailCellRenderer,
    pagination = true,
    paginationPageSize = 5,
    paginationPageSizeSelector = [5, 10, 25],
}: DataGridProps<T>) => {
    // #region Setup
    const gridRef = useRef<AgGridReact<T>>(null);
    const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
    const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
    // #endregion

    // Default grid options for master-detail
    useEffect(() => {
        console.log(`Rendering table: ${gridKey}`)

        onLoadColumns()
    }, [])

    const gridOptions: GridOptions<T> = {
        masterDetail: true, // Enables master-detail feature
        detailRowHeight: 200, // Adjust the height of the expanded row
        
        onStateUpdated: (event) => {
            // console.log('onStateUpdated', { event })
            // localStorage.setItem(`${gridKey}-grid-state`, JSON.stringify(event.state))
            onSaveColumns();
        },
        // getDetailRowData: (params) => {
        //     // Custom data fetching for the detail row
        //     params.successCallback(params.data.children); // Assuming `children` is where the detail data is stored
        // },
        // Pass in the custom detail cell renderer if provided
        detailCellRenderer: detailCellRenderer
            ? (params: ICellRendererParams<T>) => {
                return React.createElement(detailCellRenderer, { data: params.data as T });
            }
            : undefined,
    };

    // const onInitColumns = () => {
    //     const savedState = apiRef.current.getColumnState();


    //     apiRef.current.applyColumnState({ state: savedState })
    // }

    // #region Persist UI state
    const onSaveColumns = () => {
        // @ts-ignore
        const state = gridRef?.current?.api.getColumnState();

        console.log('onSaveColumns', { state })
    }

    const onLoadColumns = () => {
        // @ts-ignore
        const savedState = gridRef?.current?.api?.getColumnState();

        if (!savedState) {
            console.log("No column state to restore")
            return;
        }

        // @ts-ignore
        gridRef?.current?.api.applyColumnState({
            state: savedState,
            applyOrder: true,
        });


        console.log("onLoadColumns", savedState);
    }
    //#endregion

    return (
        <div className="ag-theme-alpine" style={containerStyle}>
            <div style={gridStyle}>
                <AgGridReact
                    // @ts-ignore
                    ref={gridRef}
                    rowData={rowData}
                    columnDefs={colDefs}
                    defaultColDef={defaultColDef}
                    gridOptions={gridOptions}
                    domLayout="autoHeight" // Ensures grid auto-adjusts its height
                    masterDetail={true} // Ensures that master-detail functionality is enabled
                    // Pagination
                    pagination={pagination}
                    paginationPageSize={paginationPageSize}
                    paginationPageSizeSelector={paginationPageSizeSelector}

                    // Columns
                    onSortChanged={onSaveColumns}
                    onGridSizeChanged={onSaveColumns}
                />
            </div>
        </div>
    );
};
