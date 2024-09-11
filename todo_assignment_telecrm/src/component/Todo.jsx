import React, { useEffect, useRef, useState } from "react";
import imgLogo from "../../public/list.png";
import style from "../css/todo.module.css";
import { BiMessageSquareAdd } from "react-icons/bi";
import { AiTwotoneCalendar } from "react-icons/ai";
import { CiLinkedin } from "react-icons/ci";
import { IoMailOutline } from "react-icons/io5";
import { AiOutlineYoutube } from "react-icons/ai";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { TfiApple } from "react-icons/tfi";
import { IoIosGlobe } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin2Line } from "react-icons/ri";
import { AiOutlineSave } from "react-icons/ai";

export const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [formData, setFormData] = useState([]);
  const ref = useRef();
  const currDate = new Date();

  useEffect(() => {
    ref.current.focus();
  }, [inputData]);

  // Function to handle form submission and add new todo
  const handleInputData = (event) => {
    event.preventDefault();
    setFormData([
      ...formData,
      { task: inputData, status: "Pending", isEditing: false },
    ]);
    setInputData("");
  };

  // Function to toggle the editing state
  const handleEditToggle = (index) => {
    const updatedTodos = [...formData];
    updatedTodos[index].isEditing = !updatedTodos[index].isEditing;
    setFormData(updatedTodos);
  };

  // Function to handle updating the task when in edit mode
  const handleTaskChange = (index, newTask) => {
    const updatedTodos = [...formData];
    updatedTodos[index].task = newTask;
    setFormData(updatedTodos);
  };

  // Function to handle deleting of a todo
  const handleDelete = (index) => {
    const updatedTodos = formData.filter((ele, indx) => indx !== index);
    setFormData(updatedTodos);
  };

  // Function to handle changing the status of a todo
  const handleStatusChange = (index, newStatus) => {
    const updatedTodos = [...formData];
    updatedTodos[index].status = newStatus;
    setFormData(updatedTodos);
  };

  const day = currDate.getDate();
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  const month = monthNames[currDate.getMonth()];
  const year = currDate.getFullYear();
  const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayOfweek = dayName[currDate.getDay()];

  return (
    <>
      <header style={{ borderBottom: "1px solid #FF8856" }}>
        <div className={style.logoDiv}>
          <div className={style.logo}>
            <img className={style.imgLogo} src={imgLogo} alt="Logo" height={'70px'} />
            <h1 style={{ color: "#FF8856" }}> Todos</h1>
          </div>
          <div className={style.dateDiv}>
            <span className={style.hide}>
              <AiTwotoneCalendar color="#FF8856" size={"30px"} />
            </span>&nbsp; &nbsp;
            <span style={{ color: "#FF8856" }}>{dayOfweek}&nbsp;,&nbsp; </span>
            <span>{day} {month} {year}</span>
          </div>
        </div>
      </header>
      <section className={style.section}>
        <form onSubmit={handleInputData}>
          <div className={style.formData}>
            <input type="text" ref={ref} value={inputData} onChange={(e) => setInputData(e.target.value)} placeholder="Add your To-Do here...." required className={style.input}/>
            <button type="submit" className={style.show}> Add Task</button>
            <button type="submit" className={style.showPls}><BiMessageSquareAdd size={'20px'}/></button>
          </div>
        </form>
        <div className={style.card}>
          {formData.map((item, index) => (
            <div key={index} className={style.cardDiv}>
              <div className={style.statusDiv}>
              <div className={style.statusBtn}>
                  Status &nbsp;
              <select value={item.status} onChange={(e) => handleStatusChange(index, e.target.value)}
              style={{ backgroundColor: item.status === "Pending"? "#FF6A6A" : item.status === "Progress"? "#C27DE8" : "#3BAC2C", cursor: "pointer",
                      padding:'5px',
                      border:'none',
                    }}>
              <option value="Pending" style={{ backgroundColor: "#FF6A6A" }} > Pending </option>
              <option value="Progress" style={{ backgroundColor: "#C27DE8" }} > In Progress </option>
              <option value="Complete" style={{ backgroundColor: "#3BAC2C" }} > Complete </option>
              </select>
              </div>
                <div className={style.btnED}>
                  <span onClick={() => handleEditToggle(index)} style={{ cursor: "pointer" }}>
                    {item.isEditing ? <AiOutlineSave size={'25px'} /> : <FiEdit size={'25px'}/>}
                  </span>
                  <span onClick={() => handleDelete(index)} style={{ cursor: "pointer" }} >
                    <RiDeleteBin2Line size={'25px'} />
                  </span>
                </div>
              </div>
              <hr color="#FF8856" />
              {item.isEditing ? (<input type="text" value={item.task} onChange={(e) => handleTaskChange(index, e.target.value)}/>) :
               (<span>{item.task}</span>)}
            </div>
          ))}
        </div>
      </section>
      <footer className={style.footer}>
        <p>@TodoApp_2024</p>
        <p> <IoIosGlobe color="#FF8856" /> English </p>
{/* 
        <AiOutlineYoutube color="#FF8856" size={'50px'}/>
        <IoMailOutline color="#FF8856" size={"45px"} />
        <CiLinkedin color="#FF8856" size={"45px"} /> */}
        {/* <button>
          <IoLogoGooglePlaystore color="#FF8856" />
          PlayStore
        </button>
        <button>
          <TfiApple color="#FF8856" />
          Apple
        </button> */}
      </footer>
    </>
  );
};
