import React from "react";

export default function AddPeople(props) {
  return (
    <form
      className="add--people--form"
      onSubmit={(event) => event.preventDefault()}
    >
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        autoComplete="off"
        onChange={props.handleChange}
      />
      <label htmlFor="dob">Date of Birth</label>
      <input type="date" name="dob" id="dob" onChange={props.handleChange} />
      <div>
        <button
          className="save btn"
          onClick={props.addPeople.name && props.addPeople.date && props.addPeople.month && props.addPeople.year? props.save: ()=>console.log("cant save")}
        >
          Save
        </button>
        <button className="cancel btn" onClick={props.closeForm}>Cancel</button>
      </div>
    </form>
  );
}
