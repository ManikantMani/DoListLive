import React, { useState, useEffect } from 'react';
import "./style.css";
import logo from "./logo.png"


// get the localStorage data back

const getLocalData = () => {
    const lists = localStorage.getItem("mytodolist")

    if (lists) {
        return JSON.parse(lists);
    } else {
        return [];
    }
};

const Todo = () => {
    const [inputData, setInputData] = useState("")
    const [items, setItems] = useState(getLocalData());
    const [isEditItem, setIsEditItem] = useState("")
    const [toggleButtonn, setToggleButton] = useState(false)

    // add the item function

    const addItem = () => {
        if (!inputData) {
            alert('plz fill the data')
        } else if (inputData && toggleButtonn) {
            setItems(
                items.map((curElem) => {
                    if (curElem.id === isEditItem) {
                        return { ...curElem, nam: inputData };
                    }
                    return curElem;
                })
            );
            setInputData([]);
            setIsEditItem(null);
            setToggleButton(false);
        }
        else {
            const myNewInputData = {
                id: new Date().getTime().toString(),
                nam: inputData,
            }
            setItems([...items, myNewInputData]);
            setInputData("");
        }
    };

    // edit the items

    const editItem = (index) => {
        const item_todo_edited = items.find((curElem) => {
            return curElem.id === index;
        });
        setInputData(item_todo_edited.nam);
        setIsEditItem(index);
        setToggleButton(true);
    };


    // how to delete items

    const deleteItem = (index) => {
        const updatedItem = items.filter((curElem) => {
            return curElem.id !== index;
        });
        setItems(updatedItem);
    };

    // remove all the elements 

    const removeAll = () => {
        setItems([]);
    }

    // local sotrage adding

    useEffect(() => {
        localStorage.setItem("mytodolist", JSON.stringify(items));
    }, [items]);

    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src={logo} alt="" />
                        <figcaption>Add Your List Here🤞</figcaption>
                        <figure>
                            <div className="addItems">
                                <input
                                    type="text"
                                    placeholder="✍ Add Items"
                                    className="form-control"
                                    value={inputData}
                                    onChange={(e) => setInputData(e.target.value)}
                                />
                                {/* toggle button */}
                                {
                                    toggleButtonn ?
                                        <i className="fa fa-edit edit-btn" onClick={addItem}></i>
                                        : (
                                            <i className="fa fa-plus plus-btn" onClick={addItem}></i>
                                        )
                                }
                            </div>


                            {/* remove all items */}

                          

                            {/* show items  */}

                            <div className="showItems">

                                {items.map((curElem) => {
                                    return (
                                        <div className="eachItem" key={curElem.id}>
                                            <h3>{curElem.nam}</h3>
                                            <div className="todo-btn">
                                                <i className="far fa-edit edit-btn" onClick={() => editItem(curElem.id)}></i>
                                                <i className="far fa-trash-alt trash-btn" onClick={() => deleteItem(curElem.id)}></i>
                                            </div>
                                        </div>
                                    );
                                })}


                            </div>

      <div className="clear-all-btn">
                                <button className="clear-all" data-sm-link-text="Remove All" onClick={removeAll}>
                                    <span> CHECK LIST</span>
                                </button>
                            </div>



                        </figure>
                    </figure>
                </div>
            </div>
        </>
    )
};

export default Todo;
