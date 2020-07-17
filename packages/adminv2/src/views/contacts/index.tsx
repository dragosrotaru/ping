import React from "react";
import { ContactList } from "../../components/contact-list";
import "./style.css";

const contacts = [
  {
    id: "123",
    name: "Dragos Rotaru",
    phone: "+15555550100",
    createdAt: "2020-07-17T05:00:29+00:00",
  },
];

export const Contacts = () => {
  return (
    <>
      <h1>Contacts</h1>
      <ContactList contacts={contacts} />
    </>
  );
};
