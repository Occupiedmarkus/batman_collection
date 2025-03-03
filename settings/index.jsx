registerSettingsPage(({ settings }) => (
  <Page>
    <Section
      title={
        <Text bold align="center">
          Clockface Settings
        </Text>
      }
    >
      <Toggle
        label="Enable background animation"
        settingsKey="toggleaAnimationInput"
      />
    </Section>
  </Page>
));