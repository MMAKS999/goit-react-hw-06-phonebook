import React from "react";
import PropTypes from 'prop-types';


export const ContactList = ({ dataContacts, onDelateContact}) => {
return(
  <div>
    <ul>
      {dataContacts &&
        dataContacts.map(({ id, name, number }) => (
          <li name={id} key={id}> {name}: {number}
            <button type="button"
              onClick={() => onDelateContact(id)}
            >
              Delete
            </button></li>
        ))}
    </ul>
  </div>
  )
};

ContactList.propTypes = {
  dataContacts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  })).isRequired,
  onDelateContact: PropTypes.func.isRequired,
}
