function Colors(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Bat Color</Text>}>
        <ColorSelect
          settingsKey="myColor"
          colors={[
            {color: '#fe0000', name: 'Beyond Red'},
            {color: 'hotpink'},
            {color: 'indigo'},
            {color: 'gold'},
            {color: 'aquamarine'},
            {color: 'deepskyblue'},
            {color: 'ghostwhite'}
          ]}
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(Colors);