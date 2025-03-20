function Colors(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Power Ring Color</Text>}>
        <ColorSelect
          settingsKey="myColor"
          colors={[
            {color: '#ff0000', name: 'Beyond Red'},
            {color: '#ff1744', name: 'Rage'},
            {color: '#ff6d00', name: 'Greed'},
            {color: '#ffd600', name: 'Fear'},
            {color: '#00ff00', name: 'Will'},
            {color: '#00e5ff', name: 'Hope'},
            {color: 'indigo', name: 'Compassion'},
            {color: '#ff00ff', name: 'Love'},
            {color: 'honeydew', name: 'Life'},
            {color: 'black', name: 'Death'},
          ]}
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(Colors);