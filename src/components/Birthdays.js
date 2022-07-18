import React from "react";

export default function Birthdays(props) {
  return (
    <li>
      <h4 className="name">{props.name}</h4>
      <p className="age">{props.age} years</p>
    </li>
  );
}
