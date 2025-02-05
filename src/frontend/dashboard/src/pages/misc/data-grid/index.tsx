import React from 'react'

import { DataGrid } from '../../../components/Core/DataGrid/DataGrid';
import { CardPayin } from '../../../models/finance';
import { CardPayinDetail } from '../../../components/Core/DataGrid/DetailRenderers/CardPayinDetail';
import { colDefs, rowData } from './dataConfig';



export const DataGridPage: React.FC = () => {
    return (
        <div className='w-full'>
            <DataGrid<CardPayin>
                gridKey={'test'}
                rowData={rowData}
                colDefs={colDefs}
                detailCellRenderer={CardPayinDetail}  
            />
        </div>
    )
}

export default DataGridPage;