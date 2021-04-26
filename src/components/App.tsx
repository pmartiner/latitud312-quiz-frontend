import React, { FC } from 'react';

import Page from 'components/layout/Page';
import QuizCard from 'components/Card/QuizCard';
import Button from 'components/Button/Button';
import RadioButton from 'components/FormElements/RadioButton';
import TextInput from 'components/FormElements/TextInput';

const App: FC = () => {
  return (
    <Page>
      <QuizCard>
        La pregunta del millón.
        <Button>
          Test
        </Button>
        <RadioButton id='test'/>
        <label htmlFor='test'>Testing radio button</label>
        <TextInput placeholder='Test Input'/>
      </QuizCard>
    </Page>
  );
};

export default App;