export async function getServerSideProps(context: {
  reg: { headers: { [x: string]: any } };
}) {
  const userAgent = context.reg.headers["user-agent"];
  const isCrawler = /bot|googlebot|crawler|spider|robot|crawling/i.test(
    userAgent
  );
  return { props: { isCrawler } };
}
