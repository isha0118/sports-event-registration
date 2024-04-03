import React from "react";
import {getCategoryInitial, convertTo12HrFormat} from "../utils";

export const EventCard = ({ event, onSelect, disabled }) => {
    const categoryInitial = getCategoryInitial(event.event_category);
    
    return (
        <>
      <div className={`event-card ${disabled ? 'disabled' : 'enabled'}`}>
        <div className={`category-badge ${categoryInitial}`}>
          {categoryInitial}
        </div>
        <div className="vertical-line"></div>
        <div className='content'>
        <h3>{event.event_name}</h3>
        <p>{event.event_category}</p>
        <p>{convertTo12HrFormat(new Date(event.start_time).toLocaleTimeString())} - {convertTo12HrFormat(new Date(event.end_time).toLocaleTimeString())}</p>
        <button onClick={onSelect} disabled={disabled}>Select</button>
        </div>
      </div>
      </>
    );
  };