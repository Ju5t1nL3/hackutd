const PdfViewer = ({ pdfUrl }) => {
  return (
    <iframe 
      src={`${pdfUrl}#view=fitH`}
      width="100%" 
      height="600px" 
      style={{ border: 'none' }}
    />
  );
};

export default PdfViewer;
