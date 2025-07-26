/* eslint-disable react/prop-types */
const SujetView = ({ fileUrl }) => {
    return (
      <div style={{ width: "100%", height: "500px", border: "1px solid #ccc" }}>
        <iframe
          src={fileUrl}
          width="100%"
          height="100%"
          style={{ border: "none" }}
        />
      </div>
    );
  };

  export default SujetView;
