import * as XLSX from 'xlsx';

export const exportToExcel = (excelData, filename) => {
    const fileExtension = '.xlsx';
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, filename);
    XLSX.writeFile(wb, filename + fileExtension);
};