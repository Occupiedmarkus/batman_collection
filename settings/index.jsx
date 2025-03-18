function Colors(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Power Color</Text>}>
        <ColorSelect
          settingsKey="myColor"
          colors={[
            {color: '#fe0000', name: 'Beyond Red'},
            {color: 'crimson'},
            {color: 'orange'},
            {color: 'yellow'},
            {color: 'limegreen'},
            {color: 'dodgerblue'},
            {color: 'indigo'},
            {color: 'hotpink'},
            {color: 'honeydew'},
            {color: 'black'}
          ]}
        />
        <Toggle>

        </Toggle>
      </Section>
    </Page>
  );
}

registerSettingsPage(Colors);