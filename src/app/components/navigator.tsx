import Link from "next/link";
import React from "react";

interface RouteLink {
  route: string;
  label: string;
}

const RouteButton: React.FC<RouteLink> = ({ route, label }) => {
  return <Link href={{ pathname: route }}>{label}</Link>;
};

export default RouteButton;

//   return <Link href={{ pathname: "/" }}></Link>;
