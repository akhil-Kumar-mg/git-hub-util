import React from "react";
import { Icon, Label, Menu, Table } from "semantic-ui-react";

const TableExamplePagination = props => (
  <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Total Open Issues #1</Table.HeaderCell>
        <Table.HeaderCell>Total Open Issues #2</Table.HeaderCell>
        <Table.HeaderCell>Opened in last 24 hours</Table.HeaderCell>
        <Table.HeaderCell>
          Opened more than 24 hours ago but less than 7 days ago
        </Table.HeaderCell>
        <Table.HeaderCell>Opened more than 7 days ago </Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell>
          <Label>{props.totalIssueCountByMethod1}</Label>
        </Table.Cell>
        <Table.Cell>
          <Label>{props.totalIssueCountByMethod2}</Label>
        </Table.Cell>
        <Table.Cell>
          <Label>{props.issuesWithIn24hours}</Label>
        </Table.Cell>
        <Table.Cell>
          <Label>{props.issuesWithIn7Days}</Label>
        </Table.Cell>
        <Table.Cell>
          <Label>{props.issuesOlderThan7Days}</Label>
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
);

export default TableExamplePagination;
