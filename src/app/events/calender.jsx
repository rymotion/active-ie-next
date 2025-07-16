export default function PublicCalendar() {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 16px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          position: "relative",
          paddingBottom: "75%", // 4:3 aspect ratio
          height: "100%",
          overflow: "hidden",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        <iframe
          src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FLos_Angeles&showPrint=0&src=Y18yMzk0YmEyYjgwM2VjODg4MDBkMDI3M2YxZjUxNTQ5NWIzNGVlMzdkNDhmMzhhZDU5YzkyMzAzMTNhOGQ5YzA2QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y180ZGNmYzczOGFjNGY5NDk2YjI0NmZhYmVhZGZmZjE0ZTVhNDRkNDBlMTVjNjliYzQ1Y2M5Y2RkNTMwMDg2OTUxQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23EF6C00&color=%23616161"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: "none",
          }}
          frameBorder="0"
          scrolling="no"
        ></iframe>
      </div>
    </div>
  );
}
