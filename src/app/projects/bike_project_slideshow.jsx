export default function BikeProjectSlideshow() {
  return (
    <div className=" page-width py-10 items-center justify-center">
      <iframe
        src="https://docs.google.com/presentation/d/e/2PACX-1vTa2JLPPww_LEfXL6BX5HHi8yl3DT42kzq2MfVgRY3MkFJ3fRbJ1mtZDFBdK53VH-xr6fVOTMywGDhL/pubembed?start=false&loop=false&delayms=60000"
        frameBorder="0"
        allowFullScreen={true}
        style={{
          transform: 'scale(0.5)',
          transformOrigin: 'top left',
          width: '200%',
          height: '600px',
          border: 'none',
          overflow: 'hidden'
        }}
      ></iframe>
    </div>
  );
}
