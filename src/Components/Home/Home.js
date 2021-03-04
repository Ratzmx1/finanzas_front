import { Container, Grid, Card, Header } from "semantic-ui-react";

import BarChart from "./BarChart";
import YearResume from "./YearResume";
import PieChart from "./PercentageOfProfits";

const Home = () => {
  return (
    <Container>
      <Header size="huge" textAlign="center">
        Resumen
      </Header>
      <Grid stackable>
        <Grid.Row columns="2">
          <Grid.Column>
            <Card fluid>
              <Card.Content>
                <Header size="large" textAlign="center">
                  Detalle del mes
                </Header>
                <BarChart />
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column>
            <Card fluid>
              <Card.Content>
                <Header size="large" textAlign="center">
                  Porcentaje de ganancias por tipo
                </Header>
                <PieChart />
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Card fluid>
            <Card.Content>
              <Header size="large" textAlign="center">
                12 Meses
              </Header>
              <YearResume />
            </Card.Content>
          </Card>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default Home;
