function Colors(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Power Ring Color</Text>}>
        <ColorSelect
          settingsKey="myColor"
          colors={[
            {color: '#fe0000', name: 'Beyond Red'},
            {color: 'crimson', name: 'Rage'},
            {color: 'orange', name: 'Greed'},
            {color: 'yellow', name: 'Fear'},
            {color: 'limegreen', name: 'Will'},
            {color: 'dodgerblue', name: 'Hope'},
            {color: 'indigo', name: 'Compassion'},
            {color: 'hotpink', name: 'Love'},
            {color: 'honeydew', name: 'Life'},
            {color: 'black', name: 'Deathbi'},
          ]}
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(Colors);