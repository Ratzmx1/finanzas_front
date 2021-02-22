import { useState } from "react";

import Lista from "./List";

import { Accordion, Icon } from "semantic-ui-react";
const WithAccordeon = ({ data }) => {
  const [activeIndex, setIndex] = useState(-1);
  const handleClick = (index) => {
    setIndex(activeIndex === index ? -1 : index);
  };

  const prodsStartWith = (start) => {
    const reg = new RegExp(`^${start}`, "i");
    return data.filter((e) => reg.test(e.name));
  };
  return (
    <Accordion styled fluid>
      <Accordion.Title
        onClick={(e, data) => handleClick(data.index)}
        index={0}
        active={activeIndex === 0}
      >
        <Icon name="dropdown" /> A
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 0}>
        <Lista data={prodsStartWith("A")} />
      </Accordion.Content>
      <Accordion.Title
        onClick={(e, data) => handleClick(data.index)}
        index={1}
        active={activeIndex === 1}
      >
        <Icon name="dropdown" /> B
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 1}>
        <Lista data={prodsStartWith("B")} />
      </Accordion.Content>
      <Accordion.Title
        onClick={(e, data) => handleClick(data.index)}
        index={2}
        active={activeIndex === 2}
      >
        <Icon name="dropdown" /> C
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 2}>
        <Lista data={prodsStartWith("C")} />
      </Accordion.Content>
      <Accordion.Title
        onClick={(e, data) => handleClick(data.index)}
        index={3}
        active={activeIndex === 3}
      >
        <Icon name="dropdown" /> D
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 3}>
        <Lista data={prodsStartWith("D")} />
      </Accordion.Content>
      <Accordion.Title
        onClick={(e, data) => handleClick(data.index)}
        index={4}
        active={activeIndex === 4}
      >
        <Icon name="dropdown" /> E
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 4}>
        <Lista data={prodsStartWith("E")} />
      </Accordion.Content>
      <Accordion.Title
        onClick={(e, data) => handleClick(data.index)}
        index={5}
        active={activeIndex === 5}
      >
        <Icon name="dropdown" /> F
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 5}>
        <Lista data={prodsStartWith("F")} />
      </Accordion.Content>
      <Accordion.Title
        onClick={(e, data) => handleClick(data.index)}
        index={6}
        active={activeIndex === 6}
      >
        <Icon name="dropdown" /> G
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 6}>
        <Lista data={prodsStartWith("G")} />
      </Accordion.Content>
      <Accordion.Title
        onClick={(e, data) => handleClick(data.index)}
        index={7}
        active={activeIndex === 7}
      >
        <Icon name="dropdown" /> H
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 7}>
        <Lista data={prodsStartWith("H")} />
      </Accordion.Content>
      <Accordion.Title
        onClick={(e, data) => handleClick(data.index)}
        index={8}
        active={activeIndex === 8}
      >
        <Icon name="dropdown" /> I
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 8}>
        <Lista data={prodsStartWith("I")} />
      </Accordion.Content>
      <Accordion.Title
        onClick={(e, data) => handleClick(data.index)}
        index={9}
        active={activeIndex === 9}
      >
        <Icon name="dropdown" /> J
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 9}>
        <Lista data={prodsStartWith("J")} />
      </Accordion.Content>
      <Accordion.Title
        onClick={(e, data) => handleClick(data.index)}
        index={10}
        active={activeIndex === 10}
      >
        <Icon name="dropdown" /> K
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 10}>
        <Lista data={prodsStartWith("K")} />
      </Accordion.Content>
      <Accordion.Title
        onClick={(e, data) => handleClick(data.index)}
        index={11}
        active={activeIndex === 11}
      >
        <Icon name="dropdown" /> L
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 11}>
        <Lista data={prodsStartWith("L")} />
      </Accordion.Content>
      <Accordion.Title
        onClick={(e, data) => handleClick(data.index)}
        index={12}
        active={activeIndex === 12}
      >
        <Icon name="dropdown" /> M
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 12}>
        <Lista data={prodsStartWith("M")} />
      </Accordion.Content>
      <Accordion.Title
        onClick={(e, data) => handleClick(data.index)}
        index={13}
        active={activeIndex === 13}
      >
        <Icon name="dropdown" /> N
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 13}>
        <Lista data={prodsStartWith("N")} />
      </Accordion.Content>

      <Accordion.Title
        onClick={(e, data) => handleClick(data.index)}
        index={26}
        active={activeIndex === 26}
      >
        <Icon name="dropdown" /> Ñ
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 26}>
        <Lista data={prodsStartWith("Ñ")} />
      </Accordion.Content>
      <Accordion.Title
        onClick={(e, data) => handleClick(data.index)}
        index={14}
        active={activeIndex === 14}
      >
        <Icon name="dropdown" /> O
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 14}>
        <Lista data={prodsStartWith("O")} />
      </Accordion.Content>
      <Accordion.Title
        onClick={(e, data) => handleClick(data.index)}
        index={14}
        active={activeIndex === 25}
      >
        <Icon name="dropdown" /> P
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 25}>
        <Lista data={prodsStartWith("P")} />
      </Accordion.Content>
      <Accordion.Title
        onClick={(e, data) => handleClick(data.index)}
        index={15}
        active={activeIndex === 15}
      >
        <Icon name="dropdown" /> Q
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 15}>
        <Lista data={prodsStartWith("Q")} />
      </Accordion.Content>
      <Accordion.Title
        onClick={(e, data) => handleClick(data.index)}
        index={16}
        active={activeIndex === 16}
      >
        <Icon name="dropdown" /> R
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 16}>
        <Lista data={prodsStartWith("R")} />
      </Accordion.Content>
      <Accordion.Title
        onClick={(e, data) => handleClick(data.index)}
        index={17}
        active={activeIndex === 17}
      >
        <Icon name="dropdown" /> S
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 17}>
        <Lista data={prodsStartWith("S")} />
      </Accordion.Content>
      <Accordion.Title
        onClick={(e, data) => handleClick(data.index)}
        index={18}
        active={activeIndex === 18}
      >
        <Icon name="dropdown" /> T
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 18}>
        <Lista data={prodsStartWith("T")} />
      </Accordion.Content>
      <Accordion.Title
        onClick={(e, data) => handleClick(data.index)}
        index={19}
        active={activeIndex === 19}
      >
        <Icon name="dropdown" /> U
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 19}>
        <Lista data={prodsStartWith("U")} />
      </Accordion.Content>
      <Accordion.Title
        onClick={(e, data) => handleClick(data.index)}
        index={20}
        active={activeIndex === 20}
      >
        <Icon name="dropdown" /> V
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 20}>
        <Lista data={prodsStartWith("V")} />
      </Accordion.Content>
      <Accordion.Title
        onClick={(e, data) => handleClick(data.index)}
        index={21}
        active={activeIndex === 21}
      >
        <Icon name="dropdown" /> W
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 21}>
        <Lista data={prodsStartWith("W")} />
      </Accordion.Content>
      <Accordion.Title
        onClick={(e, data) => handleClick(data.index)}
        index={22}
        active={activeIndex === 22}
      >
        <Icon name="dropdown" /> X
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 22}>
        <Lista data={prodsStartWith("X")} />
      </Accordion.Content>
      <Accordion.Title
        onClick={(e, data) => handleClick(data.index)}
        index={23}
        active={activeIndex === 23}
      >
        <Icon name="dropdown" /> Y
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 23}>
        <Lista data={prodsStartWith("Y")} />
      </Accordion.Content>
      <Accordion.Title
        onClick={(e, data) => handleClick(data.index)}
        index={24}
        active={activeIndex === 24}
      >
        <Icon name="dropdown" /> Z
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 24}>
        <Lista data={prodsStartWith("Z")} />
      </Accordion.Content>
    </Accordion>
  );
};

export default WithAccordeon;
