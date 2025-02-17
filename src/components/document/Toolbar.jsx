const Toolbar = ({ onDownload, onCompare, onPrint, onShare, onNewAction }) => {
  return (
    <div className="document-toolbar">
      {/* Existing buttons */}
      
      <button 
        className="toolbar-btn"
        onClick={onNewAction}
        title="New Action"
      >
        {/* Add new SVG icon */}
      </button>
    </div>
  );
};

export default Toolbar;