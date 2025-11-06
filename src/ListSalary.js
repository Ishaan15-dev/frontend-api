import React from "react";
import { Page, Grid, Table } from "tabler-react";
import SiteWrapper from "./SiteWrapper.react";
import { SALARY_API } from "./config/apiEndpoints";

class ListSalary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      error: null,
    };
  }

  loadData() {
    // API endpoint updated to use config
    fetch(`/api/v1/salary/search/all`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch salary data");
        }
        return response.json();
      })
      .then((data) => {
        this.setState({ data: data, loading: false, error: null });
      })
      .catch((err) => {
        this.setState({ error: err.message, loading: false });
        console.error("Error fetching salary data:", err);
      });
  }

  componentDidMount() {
    this.loadData();
  }

  render() {
    const { data, loading, error } = this.state;

    return (
      <SiteWrapper>
        <Page.Card title="Salary List" />
        <Grid.Col md={6} lg={10} className="align-self-center">
          {loading && <div>Loading...</div>}
          {error && <div style={{ color: "red" }}>Error: {error}</div>}
          {!loading && !error && (
            <Table>
              <Table.Header>
                <Table.ColHeader>Employee ID</Table.ColHeader>
                <Table.ColHeader>Name</Table.ColHeader>
                <Table.ColHeader>Salary</Table.ColHeader>
              </Table.Header>
              <Table.Body>
                {data && data.length > 0 ? (
                  data.map((item) => (
                    <Table.Row key={item.id}>
                      <Table.Col>{item.id}</Table.Col>
                      <Table.Col>{item.name}</Table.Col>
                      <Table.Col>{item.salary}</Table.Col>
                    </Table.Row>
                  ))
                ) : (
                  <Table.Row>
                    <Table.Col colSpan={3} style={{ textAlign: "center" }}>
                      No data found.
                    </Table.Col>
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
          )}
        </Grid.Col>
      </SiteWrapper>
    );
  }
}

export default ListSalary;
