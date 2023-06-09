import { ChangeEvent, FC, useEffect, useState } from "react";
import { GetServerSideProps } from 'next'

import { Layout } from "@/components";
import { Card, CardContent, FormControl, FormLabel, Radio, RadioGroup, FormControlLabel, Button } from "@mui/material";
import Cookies from "js-cookie";
import axios from "axios";

interface Props {
  theme: string;
}

const ThemeChangerPage: FC<Props> = ({ theme }) => {

  const [currentTheme, setCurrentTheme] = useState(theme);

  const onThemeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedTheme = event.target.value;
    setCurrentTheme(selectedTheme);
    localStorage.setItem('theme', selectedTheme);
    Cookies.set('theme', selectedTheme);


  }

  const onClick = async () => {
    const { data } = await axios.get('/api/hello');

  }

  return (
    <Layout>
      <Card>
        <CardContent>
          <FormControl>
            <FormLabel>Tema</FormLabel>
            <RadioGroup
              value={currentTheme}
              onChange={ onThemeChange }
            >
              <FormControlLabel value='light' control={ <Radio />} label="Light" />
              <FormControlLabel value='dark' control={ <Radio />} label="Dark" />
              <FormControlLabel value='custom' control={ <Radio />} label="Custom" />
            </RadioGroup>
          </FormControl>
          <Button onClick={ onClick }>
            Solicitud
          </Button>
        </CardContent>
      </Card>
    </Layout>
  );
};


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ( { req }) => {

  const { theme= 'light', name = 'No name'} = req.cookies;
  const validThemes = ['light', 'dark', 'custom'];




  return {
    props: {
      theme: validThemes.includes(theme) ? theme : 'light',
      name,
    }
  }
}

export default ThemeChangerPage;
