import { useState } from 'react'
import { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Link } from "react-router-dom"


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
    height: "fit-content",
    marginRight: "5px"
  },
  title: {
    fontWeight: "bold"
  },
  background: {
    backgroundColor: "#ECF5EA",
    boxShadow: "10px 10px 10px"
  }
}

function App() {
  const [listItem, setListItem] = useState("");

  let tempList = JSON.parse(localStorage.getItem('list')) //Retrieves array from local storage
  let completedTempList = JSON.parse(localStorage.getItem('completedList'))


  const [list, setList] = useState(tempList ? tempList : []); //If local storage exists, set list's initial state to it, otherwise set it to a blank array
  const [completedList, setCompletedList] = useState(completedTempList ? completedTempList : [])

  
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list)) //On load sets local storage to itself, otherwise sets local storage when state array "list" is changed
    setListItem("")
  }, [list])

  useEffect(() => {
    localStorage.setItem("completedList", JSON.stringify(completedList))
  }, [completedList])

  

  function checkById (ident, itemTask, itemCheck) { 
    setList ((changedItems) => {
      return changedItems.map((item) => { //creates a new list with the ID's item's check changed
        if (item.id === ident) {
          return {id: ident, task: itemTask, check: !itemCheck}
        } else {
          return {id: item.id, task: item.task, check: item.check}
        }
      })
    })
  }

  function changeById (ident, itemCheck) {
    setList((changedItems) => {
      return changedItems.map((item) => { //creates a new list with the ID's item's task changed
        if (item.id === ident) {
          return {id: ident, task: listItem, check: itemCheck}
        } else {
          return {id: item.id, task: item.task, check: item.check}
        }
      })
    })
  }

  function deleteById (ident, deletedTask, itemCheck) { //creates a new list that doesn't include the item with the corresponding ID
    setCompletedList([...completedList, {id: ident, task: deletedTask, check: itemCheck}]) //adds to completed list
    setList((savedItems) => {
      return savedItems.filter((item) => item.id !== ident)
    })
  }

  function deleteAll (ident, deletedTask, itemCheck) {
    setCompletedList([...completedList, ...list]) //adds list to completed list
    setList([]) //sets list to empty array
  }

  function populateItem(populateList) { //function to display items
    return (
      <div className="">
      {populateList.map((item) => ( //iterates through list and displays the listItem as well as buttons to delete and change
        <li key={item.id} style={{...styles.list}} className="d-flex justify-content-between">
          
          <div style={{...styles.listWords}}>
            <input type="checkbox" className="me-2" 
            checked={item.check}
            onChange={() => {
              checkById(item.id, item.task, item.check) //input to check
            }}></input>
            {item.task}
          </div>
          <div>
          <button className="m-2" //button to delete
            onClick={() => {
            deleteById(item.id, item.task, item.check)
          }
        } >🗑️</button> {/* button to change */}
          <button onClick={() => {
            changeById(item.id, item.check)
          }
        } >✏️</button></div>
        </li>
      ))}
      </div>
    )
  }
  


  
  function stateItem() {

    const handleEnter = () => {setList([ 
                              ...list,
                              {id: (uuidv4()), task: listItem, check: false}]);
    }

    return (
      <div className=""> 
        <input className="me-3 mb-3 mt-3" style={{...styles.inputBox}} value={listItem} onChange={(e) => setListItem(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleEnter()}></input> 
          <button onClick={handleEnter} style={{...styles.addButton}}
                  onKeyDown={((e) => e.key === 'Enter' && handleEnter)}>Add To-do</button>
          <button onClick={deleteAll} style={{...styles.addButton}}>🗑️All</button>
          <ul className="p-0">
            {populateItem(list)} {/* Calls function to display items*/}
          </ul>
      </div>
    )
  }

  


  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div style={{...styles.background}} className="p-3 border border-5 border-dark">
          <div className="d-flex justify-content-between row">
          <Link to='/deleted' className="col-12">🗑️To-Done</Link>
            <div style={{...styles.title}}>HENRY'S TO-DO LIST<div>
              Tasks: {list.length}</div>
              </div></div>
          {stateItem()}
        </div>
      </div>
    </>
  )
}

export default App
