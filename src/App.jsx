import { useState } from 'react';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'

let nextId = 0;

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
      <div>
      {populateList.map((item) => (
        <li key={item.id}>{item.task}
          <button onClick={() => {
            deleteById(item.id)
          }
        } >Delete</button>
          <button onClick={() => {
            changeById(item.id)
          }
        } >Change</button>
        </li>
      ))}
      </div>
    )
  }
  

 
  
  function stateItem() {
    return (
      <div>
        <input className="m-2" value={listItem} onChange={(e) => setListItem(e.target.value)}></input>
          <button onClick={() => {setList([
                                  ...list, 
                                  {id: (uuidv4()), task: listItem}]);
                        }}>Add To-Do Item</button>
          <ul>
            {populateItem(list)}
          </ul>
      </div>
    )
  }

  

  return (
    <>
      <div>
        {stateItem()}
      </div>
    </>
  )
}

export default App
