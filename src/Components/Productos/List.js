import { List } from "semantic-ui-react";

const Lista = ({ data }) => {
  return (
    <List>
      {data.map((e) => (
        <List.Item
          style={{ marginLeft: "20px" }}
          key={JSON.stringify(e)}
          icon="angle right"
          content={<p>{e.name}</p>}
        />
      ))}
    </List>
  );
};

export default Lista;
