const NewsletterWidget = () => {
  return (
    <div className="flex flex-row min-h-screen min-w-screen justify-center items-center h-full w-full px-5">
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLSexLsoBAeGLWtr4A9rpTD_g9IwOtMfDCwciMFexgIn-9NMXMQ/viewform?embedded=true"
        width="100%"
        style={{ maxWidth: 650 }}
        height="500"
        frameborder="0"
        marginheight="0"
        marginwidth="0"
      >
        Loading…
      </iframe>
    </div>
  );
};

export default NewsletterWidget;
