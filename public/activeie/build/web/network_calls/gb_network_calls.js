function fetchGBCampaign() {
  console.log(`called givebutter_script network_calls`);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer 5262|y9zGzCC15mDG3s1Pgc6WHwVVJYfqZAib5uckvIWf",
    },
  };

  fetch("https://api.givebutter.com/v1/campaigns", options)
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
}
