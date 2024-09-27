// import React, { useState } from "react";

export function ActiveList({ list,deleteTodo }) {
  return (
    <div>
      {list.map((obj) => {
        if (!obj.status) {
          return (
            <div className="outer">
              <div className="tab">
                <div>
                  <span>{obj.text}</span>
                </div>
                <div>
                  <i onClick={()=>deleteTodo(obj.id)} class="bi bi-trash"></i>
                </div>
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}
