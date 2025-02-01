function gBCaller() {
  console.log(`called givebutter_script asset`);
  const data = null;

  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      console.log(this.responseText);
    }
  });

  xhr.open("GET", "https://api.givebutter.com/v1/campaigns", true);
  xhr.setRequestHeader("accept", "application/json");
  xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
  xhr.setRequestHeader("Access-Control-Allow-Credentials", true);
  xhr.setRequestHeader(
    "Access-Control-Allow-Methods",
    "GET,PUT,PATCH,POST,DELETE"
  );
  xhr.setRequestHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  xhr.setRequestHeader(
    "Authorization",
    "Bearer 5262|y9zGzCC15mDG3s1Pgc6WHwVVJYfqZAib5uckvIWf"
  );

  xhr.onreadystatechange = function (oEvent) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        console.log(xhr.responseText);
        xhr.send(xhr.responseText);
      } else {
        console.log("error", xhr.statusText);
        xhr.send("null");
      }
    } else {
      xhr.send("null");
    }
  };

  xhr.send("null");
}

class GiveButter {
  get gBCampaign() {
    console.log(`called givebutter_script asset`);
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer 5262|y9zGzCC15mDG3s1Pgc6WHwVVJYfqZAib5uckvIWf",
      },
    };

    try {
      fetch("https://api.givebutter.com/v1/campaigns", options)
        .then((res) => {
          console.log("hit network call");
          if (!res.ok) {
            throw new Error("HTTP error: ${res.status}");
          } else {
            const x = `res: ${res}`;
            console.log(x);
            return res.json();
          }
        })
        .then((res) => {
          const x = `res: ${res}`;
          console.log(x);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  }
}
