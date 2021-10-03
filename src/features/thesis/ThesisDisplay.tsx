import React from "react";
import { useSelector } from "react-redux";
import {  selectSelectedThesis } from "./thesisSlice";
import { Table, TableBody, TableCell, TableRow } from "@material-ui/core";

const ThesisDisplay: React.FC = () => {
  const selectedThesis = useSelector(selectSelectedThesis);
  const rows = [
    { item: "Title", data: selectedThesis.title },
    { item: "Authors", data: selectedThesis.authors },
    { item: "Year", data: selectedThesis.year },
    { item: "Evaluation", data: selectedThesis.evaluation_score },
    { item: "Url", data: selectedThesis.url },
    { item: "Introducer", data: selectedThesis.introducer_username },
    { item: "Citation", data: selectedThesis.citaiton },
    { item: "Summary", data: selectedThesis.summary },
    { item: "Comment", data: selectedThesis.comment },
    { item: "Category", data: selectedThesis.category_item },
  ];
  if (!selectedThesis.title) {
    return null;
  }

  return (
    <>
      <h2>Dissertation details</h2>
      <Table>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.item}>
              <TableCell align="center">
                <strong>{row.item}</strong>
              </TableCell>
              <TableCell align="center">{row.data}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default ThesisDisplay;
