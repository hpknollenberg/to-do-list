import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'


const styles = {
  list: {
    listStyleType: "none",
    display: "flex",
    alignItems: "center"
  },
  listWords: {
    maxWidth: "150px",
    wordWrap: "break-word",
  },
  inputBox: {
    width: "50%"
  },
  addButton: {
    width: "fit-content",
    height: "fit-content"
  },
  title: {
    fontWeight: "bold"
  },
  background: {
    backgroundColor: "#F4EAF5",
    boxShadow: "10px 10px 10px"
  }
}


function Deleted() {

  let completedTempList = JSON.parse(localStorage.getItem('completedList'))
  const [completedList, setCompletedList] = useState(completedTempList ? completedTempList : [])

  let tempList = JSON.parse(localStorage.getItem('list')) //Retrieves array from local storage
  const [list, setList] = useState(tempList ? tempList : []); //If local storage exists, set list's initial state to it, otherwise set it to a blank array




  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list)) //On load sets local storage to itself, otherwise sets local storage when state array "list" is changed
  }, [list])

  useEffect(() => {
    localStorage.setItem("completedList", JSON.stringify(completedList))
  }, [completedList])



  function retrieveById (ident, deletedTask, itemCheck) {
    setList([...list, {id: ident, task: deletedTask, check: itemCheck}])
    deleteById(ident)
  }

  function deleteById (ident) { //creates a new list that doesn't include the item with the corresponding ID
    setCompletedList((savedItems) => {
      return savedItems.filter((item) => item.id !== ident)
    })
  }



  function populateItem(populateList) { //function to display items
    return (
      <div className="">
      {populateList.map((item) => ( //iterates through list and displays the listItem as well as buttons to delete and change
        <li key={item.id} style={{...styles.list}} className="d-flex justify-content-between">
          <div style={{...styles.listWords}}>
          <input type="checkbox" className="me-2" 
            checked={item.check} />
            {item.task}
          </div>
          <div>
            <button className="m-2" //button to delete
              onClick={() => {
              deleteById(item.id)
            }
          } >🗑️♾️</button> {/* button to change */}
            <button
              onClick={() => {
                retrieveById(item.id, item.task, item.check)
              }}
            >🔄️</button>
        </div>
        </li>
      ))}
      </div>
    )
  }



  return (
      <>
        <div className="d-flex justify-content-center align-items-center vh-100">
        
          <div style={{...styles.background}} className="p-3 border border-5 border-dark">
            <div className="d-flex justify-content-center row">
            <Link to='/' className="col-12">✏️To-Do</Link>
            <div style={{...styles.title}}>HENRY'S TO-DONE LIST<div>
              Deleted Tasks: {completedList.length}</div></div></div>
            {populateItem(completedList)}
            </div>
      </div>
      </>
    )
  }

export default Deleted