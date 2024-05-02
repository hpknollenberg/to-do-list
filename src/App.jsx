import { useState } from 'react';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'


const styles = {
  list: {
    listStyleType: "none",
  },
  listWords: {
    maxWidth: "150px",
    wordWrap: "break-word"
  },
  inputBox: {
    width: "50%"
  },
  addButton: {
    width: "fit-content",
    height: "fit-content"
  },
}

function App() {
  const [listItem, setListItem] = useState("");

  let tempList = JSON.parse(localStorage.getItem('list'))

  const [list, setList] = useState(tempList ? tempList : []);

  
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list))
  }, [list])

  
  function changeById (ident) {
    setList((changedItems) => {
      return changedItems.map((item) => {
        if (item.id === ident) {
          return {id: ident, task: listItem}
        }
        else {
          return {id: item.id, task: item.task}
        }
      })
    })
  }

  function deleteById (ident) {
    setList((savedItems) => {
      return savedItems.filter((item) => item.id !== ident)
    })
  }

  function populateItem(populateList) {
    return (
      <div className="">
      {populateList.map((item) => (
        <li key={item.id} style={{...styles.list}} className="d-flex justify-content-between">
          <div style={{...styles.listWords}}>
            {item.task}
          </div>
          <div>
          <button className="m-2"
            onClick={() => {
            deleteById(item.id)
          }
        } >🗑️</button>
          <button onClick={() => {
            changeById(item.id)
          }
        } >Edit</button></div>
        </li>
      ))}
      </div>
    )
  }
  

 
  
  function stateItem() {
    return (
      <div className="">
        <input className="me-3 mb-3 mt-3" style={{...styles.inputBox}} value={listItem} onChange={(e) => setListItem(e.target.value)}></input>
          <button onClick={() => {setList([
                                  ...list, 
                                  {id: (uuidv4()), task: listItem}]);
                        }} style={{...styles.addButton}}>Add To-do</button>
          <ul className="p-0">
            {populateItem(list)}
          </ul>
      </div>
    )
  }

  

  return (
    <><div className="d-flex justify-content-center align-items-center vh-100">
        <div className="p-3 border border-5 ">
          <div className="d-flex justify-content-center">
            HENRY'S TO-DO LIST</div>
          {stateItem()}
        </div>
      </div>
    </>
  )
}

export default App
