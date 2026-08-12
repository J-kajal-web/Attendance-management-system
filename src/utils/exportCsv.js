// CSV Export Utility for browser download

export const exportToCSV = (filename, rows, headers) => {
  if (!rows || !rows.length) {
    alert('No data available to export.');
    return;
  }

  const csvContent = [];
  
  // Add headers
  if (headers && headers.length) {
    csvContent.push(headers.map(h => `"${h.replace(/"/g, '""')}"`).join(','));
  }

  // Add row data
  rows.forEach(row => {
    const formattedRow = row.map(cell => {
      const val = cell === null || cell === undefined ? '' : String(cell);
      return `"${val.replace(/"/g, '""')}"`;
    });
    csvContent.push(formattedRow.join(','));
  });

  const blob = new Blob([csvContent.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${new Date().toISOString().slice(0,10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
