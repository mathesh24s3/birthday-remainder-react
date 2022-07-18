import React, { useState, useEffect } from "react";
import Birthdays from "./components/Birthdays";
import AddPeople from "./components/AddPeople";

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [addPeople, setAddPeople] = useState({
    name: "",
    date: "",
    month: "",
    year: "",
  });

  const [birthdays, setBirthdays] = useState(JSON.parse(localStorage.getItem("birthdays"))|| []);

  const [birthdaysToday, setBirthdaysToday] = useState([]);

  const [count, setCount] = useState(0);

  function openForm() {
    setIsFormOpen(true);
  }

  function closeForm() {
    setIsFormOpen(false);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setAddPeople((prevAddPeople) => {
      return name === "name"
        ? {
            ...prevAddPeople,
            [name]: value,
          }
        : {
            ...prevAddPeople,
            date: value.split("-")[2],
            month: value.split("-")[1],
            year: value.split("-")[0],
          };
    });
  }

  function save() {
    setBirthdays((prevBirthdays) => [...prevBirthdays, addPeople]);
    closeForm();
  }

  useEffect(() => {
    localStorage.setItem("birthdays" , JSON.stringify(birthdays));

    const date = new Date();
    const currentDate = date.getDate();
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();
    const newArr = [];
    let i = 0 ;
    for (const birthday of birthdays) {
      if (birthday.date == currentDate && birthday.month == currentMonth + 1) {
        i +=1 ;
        newArr.push({
          name: birthday.name,
          age: currentYear - birthday.year,
        });
      }
    }

    setCount(i);

    setBirthdaysToday(newArr);
  }, [birthdays]);



  const birthdayElement = birthdaysToday.map((birthdayToday) => (
    <Birthdays name={birthdayToday.name} age={birthdayToday.age} />
  ));

  return (
    <div className="App">
      <button className="add--people btn" onClick={openForm}>
        Add people
      </button>
      {isFormOpen && (
        <AddPeople
          handleChange={handleChange}
          save={save}
          addPeople={addPeople}
          closeForm={closeForm}
        />
      )}

      <h2 className="birthdays--count">
        {count} {count === 1 ? "Birthday" : "Birthdays"} today
      </h2>
      {count && <ul className="birthdays--container">{birthdayElement}</ul>}
    </div>
  );
}

export default App;
