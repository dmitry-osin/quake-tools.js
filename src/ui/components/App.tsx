import React, { useEffect } from 'react'
import './App.css'
import styled from 'styled-components';

const DarkThemeRoot = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const App: React.FC = () => {


  useEffect(() => {
    if (!window.examples) return

    window.examples.onExampleUpdate((state) => {
      console.log(state)
    })
  }, [])

  return (
    <DarkThemeRoot className="dark-theme-root">
      <AppContainer>

        <h1>Example 1</h1>

      </AppContainer>
    </DarkThemeRoot >
  )
}

export default App 